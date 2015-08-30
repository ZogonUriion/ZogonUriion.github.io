
var dances = [ 
               ['Ifrit','with Ifrit in The Bowl of Embers!'],
               ['Titan','with Titan in The Navel!'],
               ['Garuda','with Garuda in The Howling Eye!'],
               ['Mog','with Whiskerwall Kupdi Koop in Thornmarch!'],
               ['Leviathan','with Leviathan in The Whorleater!'],
               ['Ramuh','with Ramuh in The Striking Tree!'],
               ['Shiva','with Shiva in Akh Afah Amphitheatre!'],
               ['Nabriales','with Nabriales in The Chrysalis!'],
               ['Vishap','with Vishap on The Steps of Faith!'],
               ['Ultima_Weapon','with Ultima Weapon!'],
               ['Rihtahtyn_sas_Arvina','with Rihtahtyn sas Arvina in Cape Westwind!'],
               ['Gilgamesh','with Gilgamesh on the Big Bridge!'],
               ['Chimera','with a Chimera!'],
               ['Hydra','with a Hydra!']
             ];
             
var shuffledDances = [];

window.onload = function()
{

  if(detectWebmCompatibility())
  {
  
    var detectJavascript = document.getElementById('dance_failure');
  
    if(detectJavascript)
      detectJavascript.parentElement.removeChild(detectJavascript);
  
    shuffledDances = dances.slice();
    shuffle(shuffledDances);
  
    createPageElements();
    
    loadVideo();
  }
  else
  {
    var noWebmSupportHeader = document.getElementById('header');
    
    if(header)
      header.innerHTML = 'This browser doesn\'t support webm video playback.';
  }
}

function detectWebmCompatibility()
{
  var testVideo = document.createElement('video');

  return !!testVideo.canPlayType('video/webm');
}

function createPageElements()
{
  var container = document.getElementById('container');
  
  var header = document.createElement('h1');
  header.id = 'header';
  header.innerHTML = '!';
  
  var danceVideo = document.createElement('video');
  danceVideo.id = 'dance_video';
  danceVideo.width = 960;
  danceVideo.loop = true;
  
  var button = document.createElement('button');
  button.innerHTML = 'Dance somewhere else!';
  button.onclick = loadVideo;
  
  container.appendChild(danceVideo);
  container.appendChild(header);
  container.appendChild(document.createElement('div'));
  container.appendChild(button);
}

function loadVideo()
{
  var danceVideo = document.getElementById('dance_video');
  var header = document.getElementById('header');
  
  if(shuffledDances.length == 0)
  {
    shuffledDances = dances.slice();
    shuffle(shuffledDances);
  }
    
  var randomDance = shuffledDances.pop();
  
  danceVideo.pause();
  
  header.innerHTML = 'Zogon is dancing ' + randomDance[1];
  danceVideo.src = 'video/' + randomDance[0] + '.webm';
  
  danceVideo.play();
}

// Fisher-Yates Shuffle
function shuffle(array)
{
  var count = array.length;
  var temp;
  var randomIndex;

  while (count > 0)
  {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * count);

    count--;

    // And swap it with the last element
    temp = array[count];
    array[count] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}