String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class Character {
    constructor(number, name, codename) {
        this.number = number;
        this.name = name;
        if (codename) {
            this.image = codename;
        }
        else {
            this.image = name.toLowerCase()
                .replaceAll('\\s', '-')
                .replaceAll('&', 'and')
                .replaceAll('\\.', '');
        }
        this.image = `./fighters/${this.image}.png`;
    }
}

const characters = [
    new Character(1, "Mario"),
    new Character(2, "Donkey Kong"),
    new Character(3, "Link"),
    new Character(4, "Samus"),
    new Character(4.1, "Dark Samus"),
    new Character(5, "Yoshi"),
    new Character(6, "Kirby"),
    new Character(7, "Fox"),
    new Character(8, "Pikachu"),
    new Character(9, "Luigi"),
    new Character(10, "Ness"),
    new Character(11, "Captain Falcon"),
    new Character(12, "Jigglypuff"),
    new Character(13, "Peach"),
    new Character(13.1, "Daisy"),
    new Character(14, "Bowser"),
    new Character(15, "Ice Climbers"),
    new Character(16, "Sheik"),
    new Character(17, "Zelda"),
    new Character(18, "Dr. Mario"),
    new Character(19, "Pichu"),
    new Character(20, "Falco"),
    new Character(21, "Marth"),
    new Character(21.1, "Lucina"),
    new Character(22, "Young Link"),
    new Character(23, "Ganondorf"),
    new Character(24, "Mewtwo"),
    new Character(25, "Roy"),
    new Character(25.1, "Chrom"),
    new Character(26, "Mr. Game & Watch"),
    new Character(27, "Meta Knight"),
    new Character(28, "Pit"),
    new Character(28.1, "Dark Pit"),
    new Character(29, "Zero Suit Samus"),
    new Character(30, "Wario"),
    new Character(31, "Snake"),
    new Character(32, "Ike"),
    new Character(33, "Pokemon Trainer"),
    new Character(36, "Diddy Kong"),
    new Character(37, "Lucas"),
    new Character(38, "Sonic"),
    new Character(39, "King Dedede"),
    new Character(40, "Olimar"),
    new Character(41, "Lucario"),
    new Character(42, "R.O.B."),
    new Character(43, "Toon Link"),
    new Character(44, "Wolf"),
    new Character(45, "Villager"),
    new Character(46, "Mega Man"),
    new Character(47, "Wii Fit Trainer"),
    new Character(48, "Rosalina & Luma"),
    new Character(49, "Little Mac"),
    new Character(59, "Greninja"),
    new Character(51, "Mii Fighter"),
    new Character(54, "Palutena"),
    new Character(55, "Pac-Man"),
    new Character(56, "Robin"),
    new Character(57, "Shulk"),
    new Character(58, "Bowser Jr."),
    new Character(59, "Duck Hunt"),
    new Character(60, "Ryu"),
    new Character(60.1, "Ken"),
    new Character(61, "Cloud"),
    new Character(62, "Corrin"),
    new Character(63, "Bayonetta"),
    new Character(64, "Inkling"),
    new Character(65, "Ridley"),
    new Character(66, "Simon"),
    new Character(66.1, "Richter"),
    new Character(67, "King K. Rool"),
    new Character(68, "Isabelle", "shizue"),
    new Character(69, "Incineroar", "gaogaen"),
    new Character(70, "Piranha Plant", "packun-flower")
];

function editableTextBlurred() {
    const html = $(this).val();
    const viewableText = $("<div class='row'>");
    viewableText.html(html);
    $(this).replaceWith(viewableText);

    $(viewableText).click(makeDivEditable);
}

function makeDivEditable() {
    const divHtml = $(this).html();
    const editableText = $("<textarea />");
    editableText.val(divHtml);
    $(this).replaceWith(editableText);
    editableText.focus();
    editableText.blur(editableTextBlurred);
}

function addColumnToEnd() {
    $('<div class="column"><div class="row">Title</div><ol style="min-height: 100%;" class="connected-sortable"></ol></div>')
        .appendTo("#main")
        
    $(".connected-sortable").sortable({
        connectWith: ".connected-sortable"
    }).disableSelection();
}

function removeLastColumn() {
    const toRemove = $("#main").children().last();
    toRemove.children().appendTo("#start-list");
    toRemove.remove();
}

$(function() {
    const startList = $("#start-list");
    characters.forEach(element => {
        $(`<li id="f-${element.number}"><img class="fighter" src="${element.image}" alt="${element.number}: ${element.name}"></li>`).appendTo(startList);
    });

    $(".connected-sortable").sortable({
        connectWith: ".connected-sortable"
    }).disableSelection();

    $("div.row").click(makeDivEditable);

    $(document).keypress(function(e) {
        if (e.which == 61) {
            addColumnToEnd();
        }
        else if (e.which == 45) {
            removeLastColumn();
        }
    });
});
