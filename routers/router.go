// Copyright 2014 Oleg Dolya. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.
package routers

import (
	"myapp/controllers"
	"github.com/astaxie/beego"
)

func init(){
  beego.RESTRouter("/api/v1/example", &controllers.ExampleServiceController{})
	beego.Router("/", &controllers.MainController{})
}
