package com.devEra.ws.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String code, String firstName) {
        String subject = "DevEra - Email Verification Code";
        String text = "Hello " + firstName + ",\n\n"
                + "To verify your account, please use the following code:\n\n"
                + code + "\n\nThis code is valid for 10 minutes.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }

    public void sendForgotPasswordCode(String to, String code, String firstName) {
        String subject = "DevEra - Password Reset Code";
        String text = "Hello " + firstName + ",\n\n"
                + "To reset your password, please use the following code:\n\n"
                + code + "\n\nThis code is valid for 10 minutes.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }

}
