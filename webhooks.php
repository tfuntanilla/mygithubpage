<?php
	
	$payload = json_decode($_REQUEST['payload']);

	$emailAddress = "trishafuntanilla@gmail.com";

	if ($payload->ref === 'refs/heads/master')
	{
		$subject = "Github repository push";
		$body = "Push was made to repository";

		mail($emailAddress, $subject, $body);
	}

?>

