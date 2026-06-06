# Giai đoạn 1: Build ứng dụng (sử dụng Maven để build .jar)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
# Copy file cấu hình maven và source code
COPY pom.xml .
COPY src ./src
# Build ứng dụng, bỏ qua các bài test để nhanh hơn
RUN mvn clean package -DskipTests

# Giai đoạn 2: Tạo môi trường thực thi (chỉ chứa file .jar)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy file .jar từ giai đoạn build sang
COPY --from=build /app/target/*.jar app.jar

# Mở cổng (Render sẽ tự map theo biến môi trường PORT)
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
