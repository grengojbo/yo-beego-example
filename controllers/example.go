// Copyright 2014 Oleg Dolya. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.
package controllers

import (
  "github.com/astaxie/beego"
  "myapp/models"
  "strconv"
)

type ExampleServiceController struct {
  baseController
}

func (this *ExampleServiceController) Get() {
  // page, _ := this.GetInt("page")
  // page_size, _ := this.GetInt("rows")
  sort := this.GetString("sort")
  order := this.GetString("order")
  if len(order) > 0 {
    beego.Debug("Order: ", order)
    if order == "desc" {
      sort = "-" + sort
    }
  } else {
    sort = "ServiceId"
  }
  beego.Debug("API ExampleServiceController metod GET isLogin: ", this.isLogin)
  objectId := this.Ctx.Input.Params[":objectId"]
  if this.isLogin {
    if objectId != "" {
      id, err := strconv.Atoi(objectId)
      if err == nil {
        // TODO: заменить function полчения одной записи
        ob, err := models.GetExample(int64(id))
        if err != nil {
          mess := "Is not row ID:"
          this.Data["json"] = &map[string]interface{}{"error": true, "message": mess}
        } else {
          this.Data["json"] = ob
        }
      }
    } else {
      // TODO: заменить function полчения списка записей
      ob, cnt := models.GetPaysList(sort)
      this.Data["json"] = &map[string]interface{}{"count": cnt, "next": nil, "previous": nil, "results": &ob}
    }
  } else {
    mes := "Is not Auntification :("
    this.Data["json"] = &map[string]interface{}{"error": true, "message": mes}
  }
  this.ServeJson()
}
