package routers

import (
	"myapp/controllers"
	"github.com/astaxie/beego"
)

func init(){
  beego.RESTRouter("/api/v1/example", &controllers.ExampleServiceController{})
	beego.Router("/", &controllers.MainController{})
}
