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

type Example struct {
	Id      int64     `orm:"auto;pk"`
	Name    string    `orm:"size(255);null;index"`
	Created time.Time `orm:"auto_now_add;type(datetime);null"`
	Updated time.Time `orm:"auto_now;type(datetime);null"`
}

func (o *Example) TableName() string {
	return "example"
}

func GetExample(ObjectId int64) (object Example, err error) {
	o := orm.NewOrm()
	object = Example{Id: ObjectId}
	err = o.Read(&object)
	if err == orm.ErrNoRows {
		return object, errors.New("No result found.")
	} else if err == orm.ErrMissPK {
		return object, errors.New("No primary key found.")
	} else {
		return object, nil
	}
}

func GetExampleList(sort string) (objects []orm.Params, count int64) {
	o := orm.NewOrm()
	p := new(Example)
	count, err := o.QueryTable(p).OrderBy(sort).Values(&objects)
	if err == nil {
		beego.Debug("GetExampleList Result count: ", count)
	}
	return objects, count
}

func init() {
	orm.RegisterModel(new(Example))
}
