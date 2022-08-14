<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

// поля из формы
$name = $_POST['user_name'];
$lastName = $_POST['user_lastname'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$dateOfLesson = $_POST['user_date'];
$level = $_POST['user_level'];
$lesson = $_POST['user_lesson'];
$result = $_POST['user_result'];
$interests = $_POST['user_interests'];
// токен нашего бота из botFather
$token = "5582453998:AAGMOzSCvZ2WIIzheveKi_B2pKhxG8hykcg";
// $chat_id = "https://api.telegram.org/bot5582453998:AAGMOzSCvZ2WIIzheveKi_B2pKhxG8hykcg/getUpdates";
$chat_id = "393836162";
$arr = array(
  'Имя студента:' => $name,
  'Фамілія:' => $lastName,
  'Телефон: ' => $phone,
  'Email:' => $email,
  'Перший урок:' => $dateOfLesson,
  'Рівень знань англійської:' => $level,
  'Кількість уроків в тиждень:' => $lesson,
  'Планує отримати результат за:' => $result . ' місяців',
  'Студента цікавлять наступні теми:' => $interests
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>
