const colors = ["white", "red", "orange", "yellow", "green", "blue", "purple", "black", "brown"];

const colorMap = {
  red: "#dd2e44",
  green: "#78b159",
  blue: "#5dadec",
  orange: "#f4900c",
  purple: "#aa8ed6",
  white: "#e6e7e8",
  brown: "#c1694f",
  black: "#31373d",
  yellow: "#fdcb58",
}

const colorPicker = $('#colorPicker');

let [currentSelectedColor] = colors;

const n = 11;
const gridDiv = $('#grid');
for (let i = 0; i < n; i++) {
  const newRow = $('<div class="row"></div>');
  gridDiv.append(newRow);
  for (let j = 0; j < n; j++) {
    const square = $('<div class="square"></div>');
    square.data('color', currentSelectedColor);
    square.css('background-color', colorMap[currentSelectedColor]);
    newRow.append(square);
  }
}

colors.forEach(color => { 
  const colorDiv = $(`<div class="colorMe" style="background-color:${colorMap[color]}"></div>`);
  colorDiv.data('color', color);
  colorPicker.append(colorDiv);
})

const paintColor = function() {
  $(this).data('color', currentSelectedColor);
  $(this).css("background-color", colorMap[currentSelectedColor]);
}

const selectColor = function(e) {
  currentSelectedColor = $(this).data('color');
}

const selectColorByKeyPress = function({ key }) {
  if (key < colors.length) {
    currentSelectedColor = colors[key];
  }
}

const emojiMe = () => {
  let str = "";
  $(".row").each((i, elem) => {
    str += "\n";
    $(".square", elem).each((j, square) => {
      const color = $(square).data('color');
      str += color === 'red' ? ':heart:' : `:${color}_heart:`;
    });
  });

  navigator.clipboard.writeText(str);
};

$(document).keydown(selectColorByKeyPress);
$("#submit").click(emojiMe);
$(".square").click(paintColor);
$(".colorMe").click(selectColor);
$(".square").mousemove(function ({ buttons }) {
  if (buttons === 1) {
    paintColor.bind(this)();
  }
});
