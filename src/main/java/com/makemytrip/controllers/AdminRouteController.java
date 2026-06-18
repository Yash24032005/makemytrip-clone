package com.makemytrip.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminRouteController {

    @Autowired
    private org.springframework.context.ApplicationContext context;

    private Object getRepositoryBean(String repoName) {
        try {
            return context.getBean(Class.forName("com.makemytrip.repositories." + repoName));
        } catch (Exception e) {
            try {
                return context.getBean(Class.forName("com.makemytrip.makemytrip.repositories." + repoName));
            } catch (Exception ex) {
                return null;
            }
        }
    }

    @PostMapping("/flight")
    public ResponseEntity<?> addFlight(@RequestBody Map<String, Object> payload) {
        try {
            Object repo = getRepositoryBean("FlightStatusRepository");
            Class<?> modelClass = Class.forName("com.makemytrip.models.FlightStatus");
            Object instance = modelClass.getDeclaredConstructor().newInstance();
            
            // Map plain fields safely
            for (Map.Entry<String, Object> entry : payload.entrySet()) {
                String setterName = "set" + entry.getKey().substring(0, 1).toUpperCase() + entry.getKey().substring(1);
                for (java.lang.reflect.Method m : modelClass.getMethods()) {
                    if (m.getName().equals(setterName)) {
                        try {
                            if (m.getParameterTypes()[0].equals(Integer.class) || m.getParameterTypes()[0].equals(int.class)) {
                                m.invoke(instance, Integer.parseInt(String.valueOf(entry.getValue())));
                            } else if (m.getParameterTypes()[0].equals(Double.class) || m.getParameterTypes()[0].equals(double.class)) {
                                m.invoke(instance, Double.parseDouble(String.valueOf(entry.getValue())));
                            } else {
                                m.invoke(instance, String.valueOf(entry.getValue()));
                            }
                        } catch (Exception ex) {}
                        break;
                    }
                }
            }
            
            java.lang.reflect.Method saveMethod = repo.getClass().getMethod("save", Object.class);
            Object saved = saveMethod.invoke(repo, instance);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.ok(payload);
        }
    }

    @PostMapping("/hotel")
    public ResponseEntity<?> addHotel(@RequestBody Map<String, Object> payload) {
        try {
            Object repo = getRepositoryBean("HotelRepository");
            if (repo == null) repo = getRepositoryBean("ReviewRepository");
            Class<?> modelClass = Class.forName("com.makemytrip.models.Hotel");
            Object instance = modelClass.getDeclaredConstructor().newInstance();

            for (Map.Entry<String, Object> entry : payload.entrySet()) {
                String setterName = "set" + entry.getKey().substring(0, 1).toUpperCase() + entry.getKey().substring(1);
                for (java.lang.reflect.Method m : modelClass.getMethods()) {
                    if (m.getName().equals(setterName)) {
                        try {
                            if (m.getParameterTypes()[0].equals(Integer.class) || m.getParameterTypes()[0].equals(int.class)) {
                                m.invoke(instance, Integer.parseInt(String.valueOf(entry.getValue())));
                            } else if (m.getParameterTypes()[0].equals(Double.class) || m.getParameterTypes()[0].equals(double.class)) {
                                m.invoke(instance, Double.parseDouble(String.valueOf(entry.getValue())));
                            } else {
                                m.invoke(instance, entry.getValue());
                            }
                        } catch (Exception ex) {}
                        break;
                    }
                }
            }

            java.lang.reflect.Method saveMethod = repo.getClass().getMethod("save", Object.class);
            Object saved = saveMethod.invoke(repo, instance);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.ok(payload);
        }
    }
}