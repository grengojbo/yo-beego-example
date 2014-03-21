// Copyright 2014 Oleg Dolya. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.
package models

import (
	"errors"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	// "github.com/astaxie/beego/validation"
	// "strconv"
	"time"
)

type User struct {
	Id          int       `orm:"auto;pk"`
	Password    string    `orm:"size(128)" json:"-"`
	LastLogin   time.Time `orm:"column(last_login);type(datetime)"`
	IsSuperuser int8      `orm:"column(is_superuser)"`
	Username    string    `orm:"size(30)" valid:"Required;MaxSize(30);MinSize(6)"`
	FirstName   string    `orm:"size(30);column(first_name)"`
	LastName    string    `orm:"size(30);column(last_name)"`
	Email       string    `orm:"size(75)"`
	IsStaff     int8      `orm:"column(is_staff)"`
	IsActive    int8      `orm:"column(is_active)"`
	DateJoined  time.Time `orm:"column(date_joined);type(datetime)"`
}

func (u *User) TableName() string {
	return "auth_user"
}

// func checkUser(u *User) (err error) {
//  valid := validation.Validation{}
//  b, _ := valid.Valid(&u)
//  if !b {
//    for _, err := range valid.Errors {
//      log.Println(err.Key, err.Message)
//      return errors.New(err.Message)
//    }
//  }
//  return nil
// }

//get user list
func GetUsersList() (users []orm.Params, count int64) {
	o := orm.NewOrm()
	user := new(User)
	qs := o.QueryTable(user)
	qs.Values(&users)
	count, _ = qs.Count()
	return users, count
}

func Getuserlist(page int64, page_size int64, sort string) (users []orm.Params, count int64) {
	o := orm.NewOrm()
	user := new(User)
	qs := o.QueryTable(user)
	var offset int64
	if page <= 1 {
		offset = 0
	} else {
		offset = (page - 1) * page_size
	}
	qs.Limit(page_size, offset).OrderBy(sort).Values(&users)
	count, _ = qs.Count()
	return users, count
}

func GetUserByUsername(username string) (user User, err error) {
	o := orm.NewOrm()
	user = User{Username: username}
	err = o.Read(&user, "Username")
	if err == orm.ErrNoRows {
		beego.Debug("No result found.")
		return user, errors.New("No result found.")
	} else if err == orm.ErrMissPK {
		beego.Debug("No primary key found.")
		return user, errors.New("No primary key found.")
	} else {
		// user.DecPassword = "nax rasha :("
		return user, nil
	}
}

func GetUser(userId int) (user User, err error) {
	o := orm.NewOrm()
	user = User{Id: userId}
	err = o.Read(&user)
	if err == orm.ErrNoRows {
		return user, errors.New("No result found.")
	} else if err == orm.ErrMissPK {
		return user, errors.New("No primary key found.")
	} else {
		return user, nil
	}
}

func init() {
	orm.RegisterModel(new(User))
}
