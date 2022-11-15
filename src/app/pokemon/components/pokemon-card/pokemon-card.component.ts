import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { take } from 'rxjs';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe({
      next: (isLoggedIn) => (this.isLoggedIn = isLoggedIn),
    });
  }

  showAlert() {
    document.getElementById('openAlertModalButton')?.click();
  }

  getPokemonDetails() {
    if (this.isLoggedIn) {
      this.router.navigate(['/pokemon', this.pokemon.id]);
    } else {
      this.showAlert();
    }
  }
}
