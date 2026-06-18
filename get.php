<?php

include 'db.php';    //includes the main db 


//selects the applications (id desc - top will be first in order )

$query  = "SELECT * FROM applications ORDER BY id DESC"; 

//saves the data (from the db)

$result = mysqli_query($conn, $query);

//app array stores the value(in array format)

$applications = array();

//fetch the result until 0 rows 
while ($row = mysqli_fetch_assoc($result)) {
  array_push($applications, $row);
}

//changes the array into json format 
echo json_encode($applications);

?>