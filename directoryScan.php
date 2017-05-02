  <?php
if ($_GET) {
    $dir = $_GET['dir'];
} 

//Haal alle plaatjes op
  $images = array_values(array_diff(scandir($dir), array('..', '.')));
  // $images = glob('img/*.{jpeg,gif}', GLOB_BRACE);
 $images = preg_filter('/^/', './'.$dir.'/', $images);
 
//Maak er een JSON van zodat javascript het kan lezen
  $imagesJSON = json_encode($images);
 
//Laat ze zien.
  echo $imagesJSON;