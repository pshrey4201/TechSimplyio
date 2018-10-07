<script>
function login() {
    $("#background-wrapper").load("./header.php");
}
$(document).ready(function(){
$("button").click(function(){
  $("#background-wrapper").load("./header.php");
});
});
</script>

<div id="menu">
    <ul>
        <li onclick="login()"><span>Login</span></li>
        <li><span>Search</span></li>
    </ul>
</div>
