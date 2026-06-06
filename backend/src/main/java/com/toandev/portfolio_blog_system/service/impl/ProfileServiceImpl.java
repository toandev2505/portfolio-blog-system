package com.toandev.portfolio_blog_system.service.impl;

import com.toandev.portfolio_blog_system.dto.*;
import com.toandev.portfolio_blog_system.dto.response.PublicProfileResponse;
import com.toandev.portfolio_blog_system.entity.*;
import com.toandev.portfolio_blog_system.repository.*;
import com.toandev.portfolio_blog_system.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired private UserRepository userRepository;
    @Autowired private PersonalDetailRepository personalDetailRepository;
    @Autowired private EducationRepository educationRepository;
    @Autowired private WorkExperienceRepository workExperienceRepository;
    @Autowired private SkillsRepository skillsRepository;
    @Autowired private AchievementRepository achievementRepository;
    @Autowired private ArchitectureRepository architectureRepository;

    //chưa làm converter

    @Transactional
    @Override
    public void updatePersonalDetail(Long currentUserId, PersonalDetailDTO req) {
        UserEntity currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        PersonalDetailEntity pd = personalDetailRepository.findOneByUserId(currentUserId);
        if (pd == null){
            pd = new PersonalDetailEntity();
        }

        pd.setUser(currentUser);
        pd.setFullName(req.getFullName());
        pd.setTitle(req.getTitle());
        pd.setBio(req.getBio());
        pd.setAboutMe(req.getAboutMe());
        pd.setPhone(req.getPhone());
        pd.setAddress(req.getAddress());

        if (req.getSocialLinks() != null && !req.getSocialLinks().isEmpty()) {
            pd.setSocialLinks(String.join(",", req.getSocialLinks()));
        } else {
            pd.setSocialLinks(null);
        }

        pd.setAvatarLink(req.getAvatarLink());
        personalDetailRepository.save(pd);
    }

    @Transactional
    @Override
    public void upsertEducation(Long id, Long targetUserId, EducationDTO req) {

        EducationEntity edu = (id != null)
                ? educationRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bản ghi học vấn"))
                : new EducationEntity();

        if (id == null) {
            UserEntity user = userRepository.findById(targetUserId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đích"));
            edu.setUser(user);
        }

        edu.setSchoolName(req.getSchoolName());
        edu.setDegree(req.getDegree());
        edu.setMajor(req.getMajor());
        edu.setFromDate(req.getFromDate());
        edu.setToDate(req.getToDate());

        educationRepository.save(edu);
    }

    @Transactional
    @Override
    public void upsertWorkExperience(Long id, Long targetUserId, WorkExperienceDTO req) {
        WorkExperienceEntity work = (id != null)
                ? workExperienceRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bản ghi kinh nghiệm"))
                : new WorkExperienceEntity();

        if (id == null) {
            UserEntity user = userRepository.findById(targetUserId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đích"));
            work.setUser(user);
        }

        ArchitectureEntity arch = null;
        if (req.getArchitectureId() != null) {
            arch = architectureRepository.findById(req.getArchitectureId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy kiến trúc tương ứng"));
        }

        work.setArchitecture(arch);
        work.setCompanyName(req.getCompanyName());
        work.setPosition(req.getPosition());
        work.setJobDescription(req.getJobDescription());
        work.setTechnologies(req.getTechnologies());
        work.setFromDate(req.getFromDate());
        work.setToDate(req.getToDate());

        workExperienceRepository.save(work);
    }

    @Transactional
    @Override
    public void upsertSkill(Long id, Long targetUserId, SkillsDTO req) {
        SkillsEntity skill = (id != null)
                ? skillsRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bản ghi kỹ năng"))
                : new SkillsEntity();

        if (id == null) {
            UserEntity user = userRepository.findById(targetUserId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đích"));
            skill.setUser(user);
        }

        skill.setSkillName(req.getSkillName());
        skill.setSkillCategory(req.getSkillCategory());

        skillsRepository.save(skill);
    }

    @Transactional
    @Override
    public void upsertAchievement(Long id, Long targetUserId, AchievementDTO req) {
        AchievementEntity ach = (id != null)
                ? achievementRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bản ghi chứng chỉ"))
                : new AchievementEntity();

        if (id == null) {
            UserEntity user = userRepository.findById(targetUserId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đích"));
            ach.setUser(user);
        }

        ach.setTitle(req.getTitle());
        ach.setIssueDate(req.getIssueDate());
        ach.setDescription(req.getDescription());

        achievementRepository.save(ach);
    }

    @Transactional(readOnly = true)
    @Override
    public PublicProfileResponse getPublicProfile(String username) {
        // 1. Tìm User theo username
        UserEntity user = userRepository.findOneByUsername(username);
        if (user == null) {
            throw new RuntimeException("Không tìm thấy hồ sơ người dùng tương ứng");
        }

        // 2. Lấy thông tin cá nhân (PersonalDetail) - Viết thuần bóc tách đối tượng
        PublicProfileResponse.PersonalDetailInfo pdInfo = null;
        PersonalDetailEntity pd = personalDetailRepository.findOneByUserId(user.getId());

        if (pd != null) {
            // ĐÃ CẬP NHẬT: Convert chuỗi từ DB ngược lại thành List<String> để build Response
            List<String> linksList = new ArrayList<>();
            if (pd.getSocialLinks() != null && !pd.getSocialLinks().trim().isEmpty()) {
                linksList = List.of(pd.getSocialLinks().split(","));
            }

            pdInfo = PublicProfileResponse.PersonalDetailInfo.builder()
                    .fullName(pd.getFullName())
                    .title(pd.getTitle())
                    .bio(pd.getBio())
                    .aboutMe(pd.getAboutMe())
                    .phone(pd.getPhone())
                    .address(pd.getAddress())
                    .socialLinks(linksList)
                    .avatarLink(pd.getAvatarLink())
                    .build();
        }

        // 3. Lấy danh sách Học vấn (Education)
        List<PublicProfileResponse.EducationInfo> eduList = new ArrayList<>();
        List<EducationEntity> educations = educationRepository.findAllByUserId(user.getId());
        if (educations != null) {
            for (EducationEntity edu : educations) {
                eduList.add(PublicProfileResponse.EducationInfo.builder()
                        .id(edu.getId())
                        .schoolName(edu.getSchoolName())
                        .degree(edu.getDegree())
                        .major(edu.getMajor())
                        .fromDate(edu.getFromDate())
                        .toDate(edu.getToDate())
                        .build());
            }
        }

        // 4. Lấy danh sách Kinh nghiệm (WorkExperience)
        List<PublicProfileResponse.WorkExperienceInfo> workList = new ArrayList<>();
        List<WorkExperienceEntity> experiences = workExperienceRepository.findAllByUserId(user.getId());
        if (experiences != null) {
            for (WorkExperienceEntity work : experiences) {
                String archName = (work.getArchitecture() != null) ? work.getArchitecture().getName() : null;

                workList.add(PublicProfileResponse.WorkExperienceInfo.builder()
                        .id(work.getId())
                        .companyName(work.getCompanyName())
                        .position(work.getPosition())
                        .jobDescription(work.getJobDescription())
                        .technologies(work.getTechnologies())
                        .architectureName(archName)
                        .fromDate(work.getFromDate())
                        .toDate(work.getToDate())
                        .build());
            }
        }

        // 5. Lấy danh sách Kỹ năng (Skills)
        List<PublicProfileResponse.SkillInfo> skillList = new ArrayList<>();
        List<SkillsEntity> skills = skillsRepository.findAllByUserId(user.getId());
        if (skills != null) {
            for (SkillsEntity skill : skills) {
                skillList.add(PublicProfileResponse.SkillInfo.builder()
                        .id(skill.getId())
                        .skillName(skill.getSkillName())
                        .skillCategory(skill.getSkillCategory())
                        .build());
            }
        }

        // 6. Lấy danh sách Chứng chỉ (Achievement)
        List<PublicProfileResponse.AchievementInfo> achieveList = new ArrayList<>();
        List<AchievementEntity> achievements = achievementRepository.findAllByUserId(user.getId());
        if (achievements != null) {
            for (AchievementEntity ach : achievements) {
                achieveList.add(PublicProfileResponse.AchievementInfo.builder()
                        .id(ach.getId())
                        .title(ach.getTitle())
                        .issueDate(ach.getIssueDate())
                        .description(ach.getDescription())
                        .build());
            }
        }

        // 7. Gộp tất cả thành một cấu trúc DTO duy nhất trả về
        return PublicProfileResponse.builder()
                .username(user.getUsername())
                .personalDetail(pdInfo)
                .educations(eduList)
                .workExperiences(workList)
                .skills(skillList)
                .achievements(achieveList)
                .build();
    }
}
