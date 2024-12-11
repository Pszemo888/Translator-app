// user.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  profile: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Subscribe to user profile updates
    this.userService.userProfile$.subscribe(
      profile => this.profile = profile
    );
    
    // Initial profile load
    this.userService.getProfile().subscribe({
      error: (error) => console.error('Error fetching profile:', error)
    });
  }
}