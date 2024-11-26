const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;

const vertical_margin = 300;
const horizontal_margin = 200;

// set bubble size

if (width < 200) {
    var bubble_size = 70;
    var rows = Math.floor((height - vertical_margin)/bubble_size);
    var cols = Math.floor((width - 100)/bubble_size);

} else if (width >= 200 && width < 576) {
    var bubble_size = 70;
    var rows = Math.floor((height - vertical_margin)/bubble_size);
    var cols = Math.floor((width - 100)/bubble_size);

} else if (width >= 576 && width < 768) {
    var bubble_size = 80;
    var rows = Math.floor((height - vertical_margin)/bubble_size);
    var cols = Math.floor((width - horizontal_margin)/bubble_size);

} else if (width >= 768 && width < 992) {
    var bubble_size = 80;
    var rows = Math.floor((height - vertical_margin)/bubble_size);
    var cols = Math.floor((width - horizontal_margin)/bubble_size);

} else if (width >= 992 && width < 1200) {
    var bubble_size = 80;
    var rows = Math.floor((height - vertical_margin)/bubble_size);
    var cols = Math.floor((width - horizontal_margin)/bubble_size);

} else if (width >= 1200) {
    var bubble_size = 80;
    var rows = Math.floor((height - vertical_margin)/bubble_size);
    var cols = 10;
}

rows = Math.max(rows, 1);
cols = Math.max(cols, 1);

// set up the game box
var game = document.getElementById('game');
game.style.width = (cols*bubble_size + 2) + 'px';
game.style.height = (rows*bubble_size + 2) + 'px';

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        var box = document.createElement('div');

        box.setAttribute("class", "box");
        box.setAttribute("id", "box" + i + '-' + j);

        box.style.width = bubble_size + 'px';
        box.style.height = bubble_size + 'px';

        box.style.top = i * bubble_size + 'px';
        box.style.left = j * bubble_size + 'px';

        game.appendChild(box);
    }
}

const all_boxes = document.querySelectorAll('.box');
//const txt = document.createElement('p');
//txt.setAttribute("class", "pop-par");

for (let i = 0; i < all_boxes.length; i++) {

    all_boxes[i].addEventListener('click', function() {
        all_boxes[i].style.backgroundImage = "url(images/popped_circle.png)";

        var all_popped = true;
        for (let j = 0; j < all_boxes.length; j++) {
            var image = all_boxes[j],
            style = image.currentStyle || window.getComputedStyle(image, false),
            bi = style.backgroundImage.slice(4, -1).replace(/"/g, "").slice(-15);

            if (bi == "full_circle.jpg"){
                all_popped = false;
            }
        }

        if (all_popped) {
            const done_button = document.createElement('button');
            done_button.setAttribute("class", "uk-button uk-button-default");

            done_button.style.position = "absolute";
            done_button.style.left = "50%";
            done_button.style.transform = "translateX(-50%)";

            done_button.textContent = 'go again';
            document.body.appendChild(done_button);

            done_button.addEventListener('click', () => {
                for (let k = 0; k < all_boxes.length; k++) {
                    all_boxes[k].style.backgroundImage = "url(images/full_circle.jpg)";
                }
                done_button.remove()
            });
        }
    });
}

