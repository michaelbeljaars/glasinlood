  <?php

//Haal alle plaatjes op
  $images = array_values(array_diff(scandir('img'), array('..', '.')));
  // $images = glob('img/*.{jpeg,gif}', GLOB_BRACE);

//Maak er een JSON van zodat javascript het kan lezen
  $imagesJSON = json_encode($images);

//Laat ze zien.
  echo $imagesJSON;