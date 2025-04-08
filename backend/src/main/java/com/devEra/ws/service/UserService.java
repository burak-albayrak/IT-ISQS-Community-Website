package com.devEra.ws.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.UpdateProfileRequest;
import com.devEra.ws.entity.User;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.entity.Forum.ForumPostSave;
import com.devEra.ws.repository.UserRepository;
import com.devEra.ws.repository.Forum.ForumPostSaveRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EmailVerificationService emailVerificationService;
    private final ForumPostSaveRepository forumPostSaveRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void save(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setIsActive(false);
            user.setIsBlocked(false);

            userRepository.save(user);
            emailVerificationService.sendVerificationCode(user);

        } catch (DataIntegrityViolationException e) {
            System.out.println("Duplicate email or other integrity error.");
            throw e;
        }
    }

    public void updateProfile(int userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (request.getFirstName() != null)
            user.setFirstName(request.getFirstName());
        if (request.getLastName() != null)
            user.setLastName(request.getLastName());
        if (request.getInstitution() != null)
            user.setInstitution(request.getInstitution());
        if (request.getCountry() != null)
            user.setCountry(request.getCountry());
        if (request.getAge() != null)
            user.setAge(request.getAge());
        if (request.getGender() != null)
            user.setGender(request.getGender());
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        userRepository.save(user);
    }

    public boolean updatePassword(int userId, UpdatePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return true;
    }

    public List<ForumPost> getSavedForumPosts(int userId, CreatorType creatorType) {
        List<ForumPostSave> savedPosts = forumPostSaveRepository.findBySavedByAndSavedByType(userId, creatorType);
        return savedPosts.stream()
                .map(ForumPostSave::getForumPost)
                .collect(Collectors.toList());
    }

}
