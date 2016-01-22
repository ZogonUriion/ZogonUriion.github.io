
var trialDances = [ 
                    ['Ifrit','Zogon is dancing with Ifrit in The Bowl of Embers!'],
                    ['Titan','Zogon is dancing with Titan in The Navel!'],
                    ['Garuda','Zogon is dancing with Garuda in The Howling Eye!'],
                    ['Mog','Zogon is dancing with Good King Moggle Mog XII in Thornmarch!'],
                    ['Leviathan','Zogon is dancing with Leviathan on The Whorleater!'],
                    ['Ramuh','Zogon is dancing with Ramuh at The Striking Tree!'],
                    ['Shiva','Zogon is dancing with Shiva in Akh Afah Amphitheatre!'],
                    ['Nabriales','Zogon is dancing with Nabriales in The Chrysalis!'],
                    ['Vishap','Zogon is dancing with Vishap at The Steps of Faith!'],
                    ['Ultima_Weapon','Zogon is dancing with Ultima Weapon!'],
                    ['Gilgamesh','Zogon is dancing with Gilgamesh at The Battle on the Big Bridge!'],
                    ['Ultros_And_Typhon','Zogon is dancing with Ultros & Typhon atop the Dragon\'s Neck!'],
                    ['Odin','Zogon is dancing with Odin at Urth\'s Fount!']
                  ];
             
var friendDances = [
                     ['Kalaria','Zogon is a pitiful apprentice to Chef Kalaria!'],
                     ['Dread','Zogon is dancing while Dread the Fisher catches a big one!'],
                     ['Wiggles','Zogon is dancing with his trusty steed Wiggles!']
                   ];
                   
var dungeonDances = [
                      ['Siren','Zogon is dancing with Siren in Pharos Sirius!'],
                      ['Demon_Wall','Zogon is dancing with the Demon Wall in Amdapor Keep!'],
                      ['Miser\'s_Mistress','Zogon is dancing with Miser\'s Mistress in the Aurum Vale!'],
                      ['Tonberry_King','Zogon is dancing with Tonberry King in the Wanderer\'s Palace!']
                    ];
                    
var festiveDances = [
                      ['Starlight','Zogon is dancing during the Starlight Celebration!']
                    ];
             
var trialCount = {index:0};
var friendCount = {index:0};
var dungeonCount = {index:0};
var festiveCount = {index:0};

window.onload = function()
{
  
  // Detect whether browser can play videos.
  // If it can, begin loading the page. Otherwise,
  // display message stating there is no video support.
  if(detectVideoCompatibility())
  {
  
    var detectJavascript = document.getElementById('dance_failure');
  
    if(detectJavascript)
      detectJavascript.parentElement.removeChild(detectJavascript);
  
    createPageElements();
    
  }
  else
  {
    var noVideoSupportHeader = document.getElementById('header');
    
    if(noVideoSupportHeader)
      noVideoSupportHeader.innerHTML = 'This browser doesn\'t seem to support video playback.';
  }
}

// Checks whether the browser supports html 5 video playback
// Either webm or mp4 support is fine
function detectVideoCompatibility()
{
  var testVideo = document.createElement('video');

  return testVideo.canPlayType('video/webm') || testVideo.canPlayType('video/mp4');
}


// Create the various page elements and attach them to the page.
// This includes the videos, even though they are hidden until a button is clicked.
function createPageElements()
{
  var container = document.getElementById('container');
  
  var header = document.createElement('h1');
  header.id = 'header';
  header.innerHTML = '!';
  
  createVideo(trialDances);
  createVideo(friendDances);
  createVideo(dungeonDances);
  createVideo(festiveDances);
  
  shuffle(trialDances);
  shuffle(friendDances);
  shuffle(dungeonDances);
  shuffle(festiveDances);
  
  var trialButton = document.createElement('button');
  trialButton.innerHTML = 'Dance in a Trial!';
  trialButton.onclick = function(){loadVideo(trialDances, trialCount);};
  trialButton.hidden = true;
  
  var friendButton = document.createElement('button');
  friendButton.innerHTML = 'Dance with friends!';
  friendButton.onclick = function(){loadVideo(friendDances, friendCount);};
  friendButton.hidden = true;
  
  var dungeonButton = document.createElement('button');
  dungeonButton.innerHTML = 'Dance in a Dungeon!';
  dungeonButton.onclick = function(){loadVideo(dungeonDances, dungeonCount);};
  dungeonButton.hidden = true;
  
  var festiveButton = document.createElement('button');
  festiveButton.innerHTML = 'Dance somewhere festive!';
  festiveButton.onclick = function(){loadVideo(festiveDances, festiveCount);};
  festiveButton.hidden = true;
  
  container.appendChild(header);
  container.appendChild(document.createElement('div'));
  container.appendChild(trialButton);
  container.appendChild(dungeonButton);
  container.appendChild(friendButton);
  container.appendChild(festiveButton);
  
  videoSetup();
}

// Check how many videos have been loaded. If still in progress,
// Display progress on number that have been loaded and
// check again in 200 milliseconds. Once loaded, Display
// title and ,unhide the buttons so the user can interact with the page.
function videoSetup()
{
  var header = document.getElementById('header');

  var loaded = numberOfLoadedVideos(trialDances) +
               numberOfLoadedVideos(friendDances) +
               numberOfLoadedVideos(dungeonDances) +
               numberOfLoadedVideos(festiveDances);
               
  var total = trialDances.length + friendDances.length + dungeonDances.length + festiveDances.length;
  
  if(loaded == total)
  {
    console.log(loaded);
    header.innerHTML = 'Where is Zogon dancing?';
    var buttons = document.getElementsByTagName('button');
    
    for(var i = 0; i < buttons.length; i++)
      buttons[i].hidden = false;
  }
  else
  {
    header.innerHTML = 'Loading: ' + loaded + ' / ' + total;
    console.log(loaded);
    setTimeout(videoSetup, 200);
  }
}

// Given an array of video titles and descriptions, load
// each video with autoloop and hidden both being true and
// attach them to the page. Will use webms if browser can play
// them. Otherwise, uses mp4s.
function createVideo(danceArray)
{
  var container = document.getElementById('container');
  
  for(var i = 0; i < danceArray.length; i++)
  {
    var danceVideo = document.createElement('video');
    danceVideo.id = danceArray[i][0] + '_video';
    danceVideo.width = 960;
    danceVideo.loop = true;
    danceVideo.preload = 'auto';
    danceVideo.hidden = true;
    
    if(danceVideo.canPlayType('video/webm'))
      danceVideo.src = 'video/' + danceArray[i][0] + '.webm';
    else
      danceVideo.src = 'video/' + danceArray[i][0] + '.mp4';
      
    danceVideo.load();
    
    danceArray[i][2] = danceVideo;
    
    container.appendChild(danceVideo);
  }

}

// Given an array of video titles, returns how many have been loaded
function numberOfLoadedVideos(danceArray)
{
  var loaded = 0;

  for(var i = 0; i < danceArray.length; i++)
  {
    if(danceArray[i][2].readyState == 4)
      loaded++;
  }
  
  return loaded;
}

function loadVideo(danceArray, count)
{

  var buttons = document.getElementsByTagName('button');
    
  for(var i = 0; i < buttons.length; i++)
    buttons[i].disabled = true;

  var currentTime = 0;
  var currentVid = danceArray[0][2];
  
  var allVids = document.getElementsByTagName('video');

  for(var i = 0; i < allVids.length; i++)
  {
    if(allVids[i].hidden == false)
    {
      currentVid = allVids[i];
      currentTime = allVids[i].currentTime;
    }
  }
  
  if(count.index == danceArray.length)
  {
    count.index = 0;
    shuffle(danceArray);
    
    if(currentVid == danceArray[0][2])
      console.log('same vid');
  }
  
  var danceVideo = danceArray[count.index][2];
  
  if(danceVideo != currentVid)
    danceVideo.currentTime = currentTime;
  
  danceVideo.play();
  
  var header = document.getElementById('header');
  
  header.innerHTML = danceArray[count.index][1];
  
  count.index++;
  
  setTimeout(function()
  {
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = false;
  
    currentVid.hidden = true;
    
    if(danceVideo != currentVid)
      currentVid.pause();
      
    danceVideo.hidden = false;
    
  }, 200);
  
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