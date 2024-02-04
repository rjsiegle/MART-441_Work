function storyFunction(choice) {
    var answer1 = document.getElementById("choice1").innerHTML;
    var answer2 = document.getElementById("choice2").innerHTML;
    if (choice == 1 && answer1 == "Yes") {
        document.getElementById("story").innerHTML = "Three weeks later, you arrive in Mexico City. Christmas passes and no word from your roommate. You:";
        document.getElementById("choice1").innerHTML = "Pick up the phone and call your roommate";
        document.getElementById("choice2").innerHTML = "Decide to wait";
    } else if (choice == 2 && answer2 == "No") {
        document.getElementById("story").innerHTML = "After telling your roommate 'no', you begin to regret it. Your best friend from home points out how good it will look on your resume. After careful consideration you decide:";
        document.getElementById("choice1").innerHTML = "to ask your roommate if the offer is still stands.";
        document.getElementById("choice2").innerHTML = "you can live with your regrets.";
    } else if (choice == 1 && answer1 == "Pick up the phone and call your roommate") {
        document.getElementById("story").innerHTML = "The phone rings a few times and your roommate answers. They tell you that they are sorry they haven't called, an exciting discovery was made in The Temple of the Feathered Serpent. Your roommate asks if you'd be interested in assisting for a few days for which you will be compensated. They tell you that if that doesn't work and you just want to come by and take a tour, they would love to see you. You:";
        document.getElementById("choice1").innerHTML = "Accept the job!";
        document.getElementById("choice2").innerHTML = "Decline and decide to just visit.";
    } else if (choice == 2 && answer2 == "Decide to wait") {
        document.getElementById("story").innerHTML = "Later that day, you receive a text from your roommate asking if you'd like to come visit. You tell them:";
        document.getElementById("choice1").innerHTML = "Absolutely!";
        document.getElementById("choice2").innerHTML = "My trip is almost over so I don't think I have enough time.";
    } else if (choice == 1 && answer1 == "to ask your roommate if the offer is still stands.") {
        document.getElementById("story").innerHTML = "When you ask your roommate if the offer still stands, they exuberantly state 'of course it does!' to which you reply:";
        document.getElementById("choice1").innerHTML = "Count me in!";
        document.getElementById("choice2").innerHTML = "Ok, I'll call you while I am there.";
    } else if (choice == 2 && answer2 == "you can live with your regrets.") {
        document.getElementById("story").innerHTML = "Days into your Mexico trip, you are bored with nothing to do and decide to call your roommate. They ask how you've been and once again suggest you should join them. You tell them:";
        document.getElementById("choice1").innerHTML = "Ok!";
        document.getElementById("choice2").innerHTML = "Sorry, but no thank you.";
    }
    // Quit/Restart Options
    else if (choice == 1 && answer1 == "Accept the job!") {
        document.getElementById("story").innerHTML = "The next day you hug your parents goodbye, pile your luggage into the car the Trowel's have sent and head to the job site. Once you get there you learn that the Trowel's have uncovered a secret corridor. You cautiously enter and begin to work. Excited about your future discoveries, you fall asleep dirty and exhausted. The next morning the Trowel's wake you to let you know that the corridor has collapsed in the night due to decay." + "<br>Do you want to:";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 2 && answer2 == "Decline and decide to just visit.") {
        document.getElementById("story").innerHTML = "You and your parents all catch a shuttle to see Teotihuacan. You have a lovely day of site seeing, where you meet your roommates lovely parents. They again offer that during your next break you join them. Perhaps you will take them up on the offer next time." + "<br>What would you like to do for now?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 1 && answer1 == "Absolutely!") {
        document.getElementById("story").innerHTML = "The next day you hop onboard a bus to Teotihuacan. You meet your roommates parents and tour the grounds. When you get home, you fall asleep and dream that you had been invited to work with the Trowel's." + "<br>Do you think you can make this happen?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 2 && answer2 == "My trip is almost over so I don't think I have enough time.") {
        document.getElementById("story").innerHTML = "You spend the remainder of your trip enjoying Mexico City and all it has to offer. When you get back to campus, your roommate fills you in on all their adventures. You kind of regret not having gone to see them." + "<br>Choose a different path?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 1 && answer1 == "Count me in!") {
        document.getElementById("story").innerHTML = "You arrive in Mexico City where you spend the holiday with your family. A few days later your roommate calls and invites you to come visit them and meet their parents. You take them up on their offer and travel to Teotihuacan. You enjoy the sereness of the site and meet your roommates parents." + "<br>Part of you wishes you could have spent more time here. Do you want to try again?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 2 && answer2 == "Ok, I'll call you while I am there.") {
        document.getElementById("story").innerHTML = "While in Mexico City, you find yourself enjoy the sites and culture of the city so much, you forget to call your roommate or respond to their texts. When you return back to campus, your roommate is disappointed in you, but quickly overcomes it by gushing about the exciting experience they had. You regret your decision." + "<br>Would you like to try again?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 1 && answer1 == "Ok!") {
        document.getElementById("story").innerHTML = "Pugster decides it's time to just watch from a distance for safety." + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 2 && answer2 == "Sorry, but no thank you.") {
        document.getElementById("story").innerHTML = "The Mexico trip is the best you've ever had.... at first. Unfortunately, while exploring the city, you are falsely accused of a crime and thrown into jail in a foreign country. As you languish in prison, you wonder if you had made different choices, if you'd be in the situation you are." + "<br>Well that stinks, want to try again?";
        document.getElementById("choice1").innerHTML = "Try Again";
        document.getElementById("choice2").innerHTML = "Quit";
    } else if (choice == 1 && answer1 == "Try Again") {
        document.getElementById("story").innerHTML = "You are a student at the University of Montana studying Archaelogy. Your new roommate also studies Archaelogy and is the child of reknowned Archaelogists Roman and Anita Trowel. For Christmas this year, your parents have decided to travel to Mexico. The Trowel Family will also be there over the holiday working in Teotihuacan. Your new roommate invites you to meet the family and check out their work. Do you take your roommate up on the offer?";
        document.getElementById("choice1").innerHTML = "Yes";
        document.getElementById("choice2").innerHTML = "No";
    } else if (choice == 2 && answer2 == "Quit") {
        document.getElementById("story").innerHTML = "Thanks for playing 'Digging Decisions: The Temple of the Feathered'!";

    }


}