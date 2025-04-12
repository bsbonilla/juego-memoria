import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Juego de Memoria';

  emojis = ['🐶','🐱','🦊','🐻','🐼','🐸','🐵','🦁'];
  cards: string[] = [];
  flippedCards: number[] = [];
  matchedCards: boolean[] = [];

  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.cards = [...this.emojis, ...this.emojis]
      .sort(() => 0.5 - Math.random());
    this.flippedCards = [];
    this.matchedCards = Array(this.cards.length).fill(false);
  }

  flipCard(index: number) {
    if (this.flippedCards.length < 2 && !this.flippedCards.includes(index) && !this.matchedCards[index]) {
      this.flippedCards.push(index);

      if (this.flippedCards.length === 2) {
        const [first, second] = this.flippedCards;
        if (this.cards[first] === this.cards[second]) {
          this.matchedCards[first] = true;
          this.matchedCards[second] = true;
        }
        setTimeout(() => this.flippedCards = [], 1000);
      }
    }
  }

  isFlipped(index: number): boolean {
    return this.flippedCards.includes(index) || this.matchedCards[index];
  }
}
