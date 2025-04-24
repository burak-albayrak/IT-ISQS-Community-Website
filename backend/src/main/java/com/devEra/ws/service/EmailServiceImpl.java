package com.devEra.ws.service;

import com.devEra.ws.dto.request.ContactFormRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    // Read the target email address from application properties
    @Value("${contact.form.target.email:it.isqs.cankaya@gmail.com}") // Default value if not set
    private String targetEmail;

    @Value("${spring.mail.username}") // Get the sender email from config
    private String fromEmail;

    @Override
    public void sendContactFormEmail(ContactFormRequest contactRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail); // Set the sender email address
            message.setTo(targetEmail); // The email address to send to
            message.setSubject("New Contact Form Submission: " + contactRequest.getSubject());

            String emailBody = "You have received a new message from the contact form:\n\n"
                    + "Name: " + contactRequest.getName() + " " + contactRequest.getSurname() + "\n"
                    + "Email: " + contactRequest.getEmail() + "\n"
                    + "Subject: " + contactRequest.getSubject() + "\n"
                    + "Message:\n" + contactRequest.getMessage();

            message.setText(emailBody);

            mailSender.send(message);
            System.out.println("Contact email sent successfully to " + targetEmail);

        } catch (Exception e) {
            // Log the exception (using a proper logger is recommended)
            System.err.println("Error sending contact email: " + e.getMessage());
            // You might want to throw a custom exception here or handle it differently
            // depending on your application's error handling strategy.
            // For now, we just print the error.
             throw new RuntimeException("Failed to send contact email.", e);
        }
    }
} 