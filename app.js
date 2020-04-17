var app = new Vue({
  el: '#app',
  data: {
    socket: null,
    list: ['Rock', 'Paper', 'Scissors'],
    chosenOutput: "",
    otherPlayer: null
  },
  methods: {
    picker: function() {
      var chosenNumber = Math.floor(Math.random() * this.list.length);
      this.chosenOutput = this.list[chosenNumber];
    },
    sendMessage: function () {
      this.picker();
      var data = {
        action: "send-message",
        message: this.chosenOutput
      };
      this.socket.send(JSON.stringify(data));
      document.getElementById("button-2").style.display="none";
      this.gameLogic();
    },
    gameLogic: function () {
      if (this.chosenOutput == "Rock" && this.otherPlayer.message == "Paper") {
        document.getElementById("winner").innerHTML = "Paper wins!";
      }
      if (this.chosenOutput == "Rock" && this.otherPlayer.message == "Scissors") {
        document.getElementById("winner").innerHTML = "Rock wins!";
      }
      if (this.chosenOutput == "Rock" && this.otherPlayer.message == "Rock") {
        document.getElementById("winner").innerHTML = "It's a tie!";
      }
      //
      if (this.chosenOutput == "Paper" && this.otherPlayer.message == "Scissors") {
        document.getElementById("winner").innerHTML = "Scissors wins!";
      }
      if (this.chosenOutput == "Paper" && this.otherPlayer.message == "Rock") {
        document.getElementById("winner").innerHTML = "Paper Wins!";
      }
      if (this.chosenOutput == "Paper" && this.otherPlayer.message == "Paper") {
        document.getElementById("winner").innerHTML = "It's a tie!";
      }
      //
      if (this.chosenOutput == "Scissors" && this.otherPlayer.message == "Paper") {
        document.getElementById("winner").innerHTML = "Scissors wins!";
      }
      if (this.chosenOutput == "Scissors" && this.otherPlayer.message == "Rock") {
        document.getElementById("winner").innerHTML = "Rock wins!";
      }
      if (this.chosenOutput == "Scissors" && this.otherPlayer.message == "Scissors") {
        document.getElementById("winner").innerHTML = "It's a tie";
      }
      //
       if (this.otherPlayer.message == "Rock" && this.chosenOutput == "Paper") {
        document.getElementById("winner").innerHTML = "Paper wins!";
      }
      if (this.otherPlayer.message == "Rock" && this.chosenOutput == "Scissors") {
        document.getElementById("winner").innerHTML = "Rock wins!";
      }
      if (this.otherPlayer.message == "Rock" && this.chosenOutput == "Rock") {
        document.getElementById("winner").innerHTML = "It's a tie!";
      }
      //
      if (this.otherPlayer.message == "Paper" && this.chosenOutput == "Scissors") {
        document.getElementById("winner").innerHTML = "Scissors wins!";
      }
      if (this.otherPlayer.message == "Paper" && this.chosenOutput == "Rock") {
        document.getElementById("winner").innerHTML = "Paper Wins!";
      }
      if (this.otherPlayer.message == "Paper" && this.chosenOutput == "Paper") {
        document.getElementById("winner").innerHTML = "It's a tie!";
      }
      //
      if (this.otherPlayer.message == "Scissors" && this.chosenOutput == "Paper") {
        document.getElementById("winner").innerHTML = "Scissors wins!";
      }
      if (this.otherPlayer.message == "Scissors" && this.chosenOutput == "Rock") {
        document.getElementById("winner").innerHTML = "Rock wins!";
      }
      if (this.otherPlayer.message == "Scissors" && this.chosenOutput == "Scissors") {
        document.getElementById("winner").innerHTML = "It's a tie";
      }

    },
    restart: function () {
      window.location.reload()
    },
    connectSocket: function () {
      this.socket = new WebSocket("wss://rockpaperscissorswebsockets.herokuapp.com/");
      this.socket.onmessage = (event) => {
        var data = JSON.parse(event.data);
        console.log('received:', data);

        if (data.action == "new-message") {
          this.otherPlayer = data;
          this.gameLogic();
        }
        
      };

      this.socket.onopen = () => {
      };
    }
  },
  created: function () {
    this.connectSocket();
  }
});
