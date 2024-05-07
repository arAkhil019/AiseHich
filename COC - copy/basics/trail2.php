<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clubs of CBIT</title>
</head>
<body>
    <?php
    $a=5;
    $langs=array("tel","Hin","Eng");
    while($a>0){
        echo "aR";
        $a--;
    }
    echo "<br>";

    for($a=0;$a<5;$a++){
        echo "aa019<br>";
    }
    foreach($langs as $vals){
        echo $vals;
        echo "<br>";
    }
    function printer(){
        echo "in fntcn<br>";
    }
    printer();

    $str="Akhil";
    echo $str;
    echo "Length of str".strlen($str); // '.' (dot) acts as string concat
    echo "<br>Word count ".str_word_count($str);
    echo "<br>Reverse String ".strrev($str);
    echo "<br>'h' in str ".strpos($str,"h");
    echo "<br>replace 'a' with 'n' ".str_replace("A","N",$str);

    ?>
    
</body>
</html>