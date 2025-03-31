package com.devEra.ws.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "admins", uniqueConstraints = @UniqueConstraint(columnNames = { "email" }))
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // @UniqueEmail
    @Email(message = "Please provide a valid email address.")
    @NotBlank(message = "Email address cannot be blank.")
    @Column(name = "email")
    private String email;

    @Size(min = 2, max = 63, message = "First name must be between 2 and 63 characters.")
    @NotBlank(message = "First name cannot be blank.")
    @Column(name = "first_name")
    private String firstName;

    @Size(min = 2, max = 63, message = "Last name must be between 2 and 63 characters.")
    @NotBlank(message = "Last name cannot be blank.")
    @Column(name = "last_name")
    private String lastName;

    @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "Passwordmust contain at least one uppercase letter, one lowercase letter, and onedigit.")
    @NotBlank(message = "Password cannot be blank.")
    private String password;

}