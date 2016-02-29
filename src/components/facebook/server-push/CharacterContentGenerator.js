import {randomNumberInRange} from "../../../util/RandomNumberInRange";

export class CharacterContentGenerator{
    constructor(){
        this.map = new Map();

        var gandalfPhrases = [
            "If you're referring to the incident with the Dragon, I was barely involved. All I did was give your uncle a little nudge out of the door.",
            "Be on your guard. There are older and fouler things than Orcs in the deep places of the world.",
            "Frodo suspects something.",
            "Fly, you fools!",
            "You shall not pass!",
            "Farewell, my brave Hobbits. My work is now finished. Here at last, on the shores of the sea... comes the end of our Fellowship. I will not say do not weep, for not all tears are an evil.",
            "Prepare for battle!"
        ];

        var aragornPhrases = [
            "But I am the real Strider, fortunately. I am Aragorn son of Arathorn; and if by life or death I can save you, I will.",
            "Not idly do the leaves of Lorien fall",
            "There is still hope.",
            "I can avoid being seen if I wish, but to disappear entirely, that is a rare gift.",
            "I do not know what strength is in my blood, but I swear to you I will not let the White City fall, nor our people fail.",
            "Gentlemen, we do not stop 'til nightfall.",
            "We will not abandon Merry and Pippin to torment and death. Not while we have strength left. Leave all that can be spared behind. We travel light. Let's hunt some Orc.",
            "For Frodo!"
        ];

        var legolasPhrases = [
            "You're late. You look terrible!",
            "You would die before your stroke fell.",
            "Your friends are with you, Aragorn.",
            "Aragorn... they cannot win this fight. They are all going to die!",
            "Hurry! Frodo and Sam have reached the eastern shore.",
            "Lembas! One small bite is enough to fill the stomach of a grown man!",
            "Do not think I won't kill you, dwarf!"
        ];

        var gimliPhrases = [
            "That still only counts as one!",
            "Never thought I'd die fighting side by side with an Elf.",
            "Certainty of death. Small chance of success. What are we waiting for?",
            "Well, this is a thing unheard of. An Elf would go underground, where a Dwarf dare not. Oh, I'd never hear the end of it.",
            "Toss me"
        ];

        var boromirPhrases = [
            "You carry the fate of us all, little one. If this is indeed the will of the Council, then Gondor will see it done.",
            "I ask only for the strength to defend my people!",
            "One does not simply walk into Mordor.",
            "The world of Men will fall, and all will come to darkness, my city to ruin.",
            "Gondor has no King. Gondor needs no King.",
            "Give them a moment for pity's sake!",
            "Gandalf's death was not in vain. Nor would he have you give up hope. You carry a heavy burden, Frodo. Don't carry the weight of the dead.",
            "Our people, our people. I would have followed you, my brother... my captain... my king."
        ];

        var samPhrases = [
            "There's some good in this world, Mr. Frodo........and it's worth fighting for!",
            "It's your Sam, don't you know your Sam?",
            "don't you leave him samwise gamgee, and I don't mean to.",
            "po-ta-toes! boil 'em, mash 'em, stick 'em in a stew.",
            "It's like in the great stories, Mr. Frodo. The ones that really mattered. Full of darkness and danger they were. And sometimes you didn't want to know the end… because how could the end be happy? How could the world go back to the way it was when so much bad had happened? But in the end, it’s only a passing thing… this shadow. Even darkness must pass.",
            "Then let us be rid of it... once and for all! Come on, Mr. Frodo. I can't carry it for you... but I can carry you!",
            "FRODO"
        ];

        var pippinPhrases = [
            "A tree. There was a white tree in a courtyard of stone. It was dead. The city was burning.",
            "I don't want to be in a battle. But waiting on the edge of one I can't escape is even worse.",
            "Merry!",
            "Here do I swear fealty and service to Gondor. In peace or war. In living or dying. F... f... from this hour henceforth, until my lord release me... or death take me.",
            "The closer we are to danger, the farther we are from harm. It's the last thing he'll expect.",
            "Please, Merry. You're what, three-foot-six? At the most? Whereas me, I'm pushing three-seven, three-eight."
        ];

        var merryPhrases = [
            "I don't think he knows about second breakfast, Pip.",
            "Well, that rules you out, Pip!",
            "I think I've broken something!",
            "I know it's working! Run!",
            "Only, you've never done a hard day's work."
        ];

        this.map.set("gandalf", gandalfPhrases);
        this.map.set("aragorn", aragornPhrases);
        this.map.set("legolas", legolasPhrases);
        this.map.set("gimli", gimliPhrases);
        this.map.set("boromir", boromirPhrases);
        this.map.set("samwise", samPhrases);
        this.map.set("peregrin", pippinPhrases);
        this.map.set("meriadoc", merryPhrases);
    }

    getRandomContentForUser(firstName){
        var list = this.map.get(firstName.toLowerCase());
        if ( ! list ){
            return "No Random Content Found";
        }
        var randomIndex = randomNumberInRange(0, list.length - 1);
        var randomQuote = list[randomIndex];
        return randomQuote;
    }
}
