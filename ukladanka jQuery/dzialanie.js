const ukladanki =[
  [
  	  [1, 0, 0, 1, 0],
	  [1, 1, 1, 1, 1],
	  [1, 1, 0, 1, 0],
	  [1, 1, 1, 1, 0],
	  [0, 1, 1, 1, 1]
	  
  ],
  [
	  [0, 1, 0, 1, 1],
	  [1, 1, 1, 0, 1],
	  [1, 1, 0, 0, 0],
	  [1, 1, 0, 1, 0],
	  [1, 0, 1, 1, 1]
  ],
  [
	  [1, 1, 0, 1, 1],
	  [1, 1, 0, 0, 1],
	  [1, 1, 1, 0, 1],
	  [0, 1, 1, 1, 1],
	  [0, 1, 1, 1, 1]
  ],
  [
	  [0, 0, 1, 0, 0],
	  [1, 1, 1, 1, 0],
	  [1, 1, 1, 0, 1],
	  [1, 1, 0, 1, 1],
	  [1, 1, 1, 0, 1]
  ],
];

let licznikKlikniec = 0;

const wylosujUklad = () => {
  let ukladanka = ukladanki[Math.floor(Math.random() * 4)];
  for (i = 0; i < ukladanka.length; ++i) {
    pola = [];
    for (j = 0; j < ukladanka[0].length; ++j) {
        if (ukladanka[i][j] === 0){
          pola.push(`<td class="blank"> </td>`)
        }else if (ukladanka[i][j] === 1) {
          pola.push(`<td> </td>`)
        }
    }
    $("#siatka").append(`<tr> ${pola} </tr>`)
  }
}


$(document).ready(function(){
	$('.przyciskStart').click(function() {
		$('#start').hide();
		$('#gra').show();
	});

	wylosujUklad();

	$("td:not(.blank):not(koniec)").click(function(e){
		if($(this).hasClass("koniec"))
			return null;
	    
		if(!$(this).hasClass("blank")){
			$(this).toggleClass("on")
		}

		if(!$(this).next().hasClass("blank")){
			$(this).next().toggleClass("on")
		}

		if(!$(this).prev().hasClass("blank")){
			$(this).prev().toggleClass("on")
		}

		if(!$(this).parent().prev().children().eq(e.target.cellIndex).hasClass("blank")){
			$(this).parent().prev().children().eq(e.target.cellIndex).toggleClass("on")
		}

		if(!$(this).parent().next().children().eq(e.target.cellIndex).hasClass("blank")){
			$(this).parent().next().children().eq(e.target.cellIndex).toggleClass("on")
		}

		sprawdzCzyWygrana()
	});

});

const sprawdzCzyWygrana = () => {
  licznikKlikniec++;
  $("#wynik").text(`Liczba klikniec: ${licznikKlikniec}`)
  if ($("td:not(.on):not(.blank)").length === 0){
    $('tr > td').addClass('koniec');
    $(".header").text("UKLADANKA: WYGRANA!");
  }
}