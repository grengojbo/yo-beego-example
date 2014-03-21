// Copyright 2014 Oleg Dolya. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.
package controllers

import (
  "github.com/astaxie/beego"
  "github.com/beego/i18n"
  "myapp/models"
  "strconv"
  "strings"
  "time"
)

var langTypes []string // Languages that are supported.

func init() {
  // Initialize language type list.
  langTypes = strings.Split(beego.AppConfig.String("lang_types"), "|")

  // Load locale files according to language types.
  for _, lang := range langTypes {
    beego.Debug("Loading language: " + lang)
    if err := i18n.SetMessage(lang, "conf/"+"locale_"+lang+".ini"); err != nil {
      beego.Error("Fail to set message file:", err)
      return
    }
  }
}

// baseController represents base router for all other app routers.
// It implemented some methods for the same implementation;
// thus, it will be embedded into other routers.
type baseController struct {
  beego.Controller // Embed struct that has stub implementation of the interface.
  i18n.Locale      // For i18n usage when process data and render template.
  isLogin          bool
  userId           int
  user             models.UserNoDeny
  // user             models.User
}

// Prepare implemented Prepare() method for baseController.
// It's used for language option check and setting.
func (this *baseController) Prepare() {
  this.Data["PageStartTime"] = time.Now()
  sId := this.GetSession("_auth_user_id")
  djangoAuthModule := this.GetSession("_auth_user_backend")
  if sId == nil {
    this.userId = int(-1)
    this.SetSession("_auth_user_id", this.userId)
    sId = "-1"
  } else {
    this.userId, _ = strconv.Atoi(sId.(string))
  }
  u, err := models.GetProfile(this.userId)
  if err == nil {
    this.user = u
    this.userId = u.User.Id
    this.isLogin = true
    beego.Debug("is Login:", this.user.User.Username)
  }
  beego.Debug("Session User: ", this.userId)
  if djangoAuthModule == nil {
    this.SetSession("_auth_user_backend", "django.contrib.auth.backends.ModelBackend")
  }
  // Reset language option.
  this.Lang = "" // This field is from i18n.Locale.

  // 1. Get language information from 'Accept-Language'.
  al := this.Ctx.Request.Header.Get("Accept-Language")
  if len(al) > 4 {
    al = al[:5] // Only compare first 5 letters.
    if i18n.IsExist(al) {
      this.Lang = al
    }
  }

  // 2. Default language is English.
  if len(this.Lang) == 0 {
    this.Lang = beego.AppConfig.String("lang_default")
  }

  // Set template level language option.
  this.Data["Lang"] = this.Lang
}

type ResponseInfo struct {
}

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	this.Data["Website"] = "beego.me"
	this.Data["Email"] = "astaxie@gmail.com"
	this.TplNames = "index.tpl"
}
