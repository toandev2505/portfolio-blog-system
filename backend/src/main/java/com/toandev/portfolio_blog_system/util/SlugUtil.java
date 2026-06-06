package com.toandev.portfolio_blog_system.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugUtil {
    private static final Pattern NONLATIN = Pattern.compile("[^\\w_-]");
    private static final Pattern EDGESEPARATORS = Pattern.compile("(^-+)|(-+$)");

    public static String toSlug(String input) {
        if (input == null) return "";
        // Chuyển chữ có dấu thành không dấu
        String nowhitespace = input.replaceAll("\\s+", "-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return EDGESEPARATORS.matcher(slug.toLowerCase(Locale.ENGLISH)).replaceAll("");
    }
}
