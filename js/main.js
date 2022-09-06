 let deckId = '' //global variable

// It grabs the deckId from the API. have as many deck as you want by changing the "count="
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


  // Start scores are set as '0'
    let score1 = 0
    let score2 = 0
    document.querySelector('#player1Score').innerText = `Total Score: ${score1}`
    document.querySelector('#player2Score').innerText = `Total Score: ${score2}`

// 
document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  // Instead of hard coding deck Id each time,  we plug in "${deckId} and made the count=2"
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        // We show the image API in the DOM
        document.querySelector('#player1').src = data.cards[0].image 
        document.querySelector('#player2').src = data.cards[1].image
  

        // because the card values were strings (we saw in the console), 
        //we had to convert them to numbers
        let player1Val = convertToNum(data.cards[0].value) //run the covertToNum function
        let player2Val = convertToNum(data.cards[1].value) //run the covertToNum function
        

        if(player1Val > player2Val){
          document.querySelector('h3').innerText = 'Player 1 Wins!'
          score1 += 1
          document.querySelector('#player1Score').innerText = `Total Score: ${score1}`

        }else if(player1Val < player2Val){
          document.querySelector('h3').innerText = 'Player 2 Wins!'
          score2 += 1
          document.querySelector('#player2Score').innerText = `Total Score: ${score2}`
          
          
        }else{
          document.querySelector('h3').innerText = 'No Winner!'
          return ('no winner')
        }




      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

      // we create a helper function which converts the values to a number
      function convertToNum(val){
        if(val === 'ACE'){
          return 14
        }else if(val === 'KING'){
          return 13
        }else if(val === 'QUEEN'){
          return 12
        }else if(val === 'JACK'){
          return 11
        }else{
          return Number(val)
        }
      }




