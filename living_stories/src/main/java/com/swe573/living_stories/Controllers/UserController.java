package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Requests.EditUser;
import com.swe573.living_stories.Requests.SearchRequest;
import com.swe573.living_stories.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/{username}")
    public User getProfilePage(HttpServletRequest request, @PathVariable String username){
        userService.isUserLoggedIn(request);
        return userService.profilePage(username);
    }








    @PostMapping("/follow/{followingId}")
    public ResponseEntity<String> followUser( @PathVariable Long followingId, HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);
        String response  = userService.followUser(userId, followingId);
        return ResponseEntity.ok( response);
    }




    @PostMapping("/update")
    public ResponseEntity<User> updateUser(HttpServletRequest request, @RequestBody EditUser user) {
        Long userId = userService.isUserLoggedIn(request);


        return ResponseEntity.ok(userService.updateUser(user , userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getname")
    public ResponseEntity<User> getname(HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            User user1  = user.get();
            user1.setFollowing(null);
            user1.setBiography(null);
            user1.setFollowers(null);
            user1.setPhoto(null);
            user1.setStories(null);
            user1.setEmail(null);
            user1.setPassword(null);
            return ResponseEntity.ok(user1);

        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/profile")
    public ResponseEntity<User> getUserById(HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            User user1  = user.get();
            user1.setEmail(null);
            user1.setPassword(null);
            user1.setFollowing(null);
            if (user1.getFollowers() != null) {
                Set<User> users = user1.getFollowers();
                for (User follower:users) {
                    follower.setFollowing(null);
                    follower.setFollowers(null);
                    follower.setPhoto(null);
                    follower.setStories(null);
                    follower.setBiography(null);
                    follower.setEmail(null);
                }

            }
            return ResponseEntity.ok(user1);
        }

        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        if (userService.deleteUserById(id)) {
            return ResponseEntity.ok("Done");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/findusers")
    public List<User> findUsersWithUserName(@RequestBody SearchRequest searchRequest){
        return userService.findUsersByUsername(searchRequest);
    }
   @GetMapping("/isfollower/{followingId}")
    public int isFollower(HttpServletRequest request, @PathVariable Long followingId) { 
        Long userId = userService.isUserLoggedIn(request);
        Optional<User> user = userService.getUserById(userId);
        Optional<User> otherUser = userService.getUserById(followingId);

        if (user.isPresent() && otherUser.isPresent() ) {
            User user1 = user.get();
            User user2 = otherUser.get();
            List<User> following = user2.getFollowers();
            

            for (User followedUser : following) {
                if (followedUser.getId().equals(userId)) {
                    // The user is following the user with the given followingId
                    return 1;
                }
            }

            // The user is not following the user with the given followingId
            return 0;
        }

        
        return -1; 
    }
}

