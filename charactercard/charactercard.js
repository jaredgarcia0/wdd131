const character = {
    name: "Snortleblat",
    characterClass: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    maxHealth: 100,

    render() {
      document.getElementById("charName").textContent = this.name;
      document.getElementById("charClass").textContent = this.characterClass;
      document.getElementById("charLevel").textContent = this.level;
      document.getElementById("charHealth").textContent = this.health;
    },

    attacked() {
      if (this.health <= 0) {
        document.getElementById("message").textContent = "☠️ " + this.name + " is already dead!";
        return;
      }
      this.health -= 20;
      if (this.health <= 0) {
        this.health = 0;
        this.render();
        document.getElementById("message").textContent = "💀 " + this.name + " has died!";
      } else {
        this.render();
        document.getElementById("message").textContent = "⚔️ Attacked! -20 health";
      }
    },

    levelUp() {
      this.level += 1;
      this.render();
      document.getElementById("message").textContent = "🌟 Level up! Now level " + this.level;
    }
  };

character.render();