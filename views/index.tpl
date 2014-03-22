<!doctype html>
<html lang="en" ng-app="myapp">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Myapp</title>
  <link href="static/lib/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
  <link href="static/lib/jquery-ui/themes/smoothness/jquery-ui.css" rel="stylesheet"/>
  <link href="static/css/app.css" rel="stylesheet">
</head>
<body>
 <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
   <div class="container">
     <div class="navbar-header">
       <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </button>
       <a class="navbar-brand" href="#">{{<.Website>}}</a>
     </div>

     <!-- Collect the nav links, forms, and other content for toggling -->
     <div class="collapse navbar-collapse navbar-ex1-collapse">
       <ul class="nav navbar-nav">
         <li>
         <a href="/">Home</a>
         </li>
       </ul>
     </div>
     <!-- /.navbar-collapse -->
   </div>
   <!-- /.container -->
  </nav>
  <div class="container" ng-view></div>
  <script src="static/lib/jquery/dist/jquery.js"></script>
  <script src="static/lib/jquery-ui/ui/jquery-ui.js"></script>
  <script src="static/lib/lodash/dist/lodash.js"></script>
  <script src="static/lib/angular/angular.js"></script>
  <script src="static/lib/angular-resource/angular-resource.js"></script>
  <script src="static/lib/angular-route/angular-route.js"></script>
  <script src="static/lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
  <script src="static/lib/angular-ui-date/src/date.js"></script>

  <script src="static/js/app.old.js"></script>
  <script src="static/js/home/home-controller.js"></script>
  
</body>
</html>
