<?php
$insert=false;
if(isset($_POST['name'])){
    $submit = true;
    $server = "localhost";
    $username = "root";
    $password = "";

    $con = mysqli_connect($server,$username,$password);

    if(!$con){
        die("Connection to this data base failed".mysqli_connect_error());
    }
    // echo "Connection Succesfull";
    $name = $_POST['name']??'';
    $motto = $_POST['motto']??'';
    $insta = $_POST['insta']??'';
    $desc = $_POST['desc']??'';
    $sql = "INSERT INTO `trail`.`signclub`(`name`, `motto`, `insta`, `des`, `datetime`) VALUES ('$name','$motto','$insta','$desc',current_timestamp());";

    echo $sql;

    if($con->query($sql) == true) {
        echo "Successfully entered";
        $insert = true;
    }
    else{
        echo "ERROR: $sql <br> $con->error";
        
    }
    $con->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ClubsOfCBIT</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to the Clubs Of CBIT</h1>
        <p>Here is the only page of cbit for all the clubs at one place.</p>
        <?php
        if($insert==true){
        echo "<p class='sbtmsg'>Thanks for being a part of this HUGE CHANGE</p>";
        }
        ?>
        <form action="index.php" method="post">
            <input type="text" name="name" id="name" placeholder="Enter the Name of Club">
            <input type="text" name="motto" id="motto" placeholder="Enter the motto of Club">
            <input type="text" name="insta" id="insta" placeholder="Enter the Insta Handle">
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Describe your Club"></textarea>
            <button class="btn">Submit</button>
        </form>
    </div>
    <script src="index.js"></script>
</body>
</html>