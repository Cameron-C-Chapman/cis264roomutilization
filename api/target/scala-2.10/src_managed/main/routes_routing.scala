// @SOURCE:/var/www/cis264/api/conf/routes
// @HASH:d67b3a0950006b79e0a1d909323991803f411a3a
// @DATE:Sat Apr 26 19:27:43 CDT 2014


import play.core._
import play.core.Router._
import play.core.j._

import play.api.mvc._
import play.libs.F

import Router.queryString

object Routes extends Router.Routes {

private var _prefix = "/"

def setPrefix(prefix: String) {
  _prefix = prefix
  List[(String,Routes)]().foreach {
    case (p, router) => router.setPrefix(prefix + (if(prefix.endsWith("/")) "" else "/") + p)
  }
}

def prefix = _prefix

lazy val defaultPrefix = { if(Routes.prefix.endsWith("/")) "" else "/" }


// @LINE:6
private[this] lazy val controllers_Astra_index0 = Route("GET", PathPattern(List(StaticPart(Routes.prefix))))
        

// @LINE:9
private[this] lazy val controllers_Astra_campuses1 = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("campuses"))))
        

// @LINE:13
private[this] lazy val controllers_Astra_buildings2 = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("buildings"))))
        

// @LINE:17
private[this] lazy val controllers_Astra_rooms3 = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("rooms"))))
        

// @LINE:21
private[this] lazy val controllers_Astra_scheduleByCampus4 = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("schedule/campus/"),DynamicPart("campusId", """[^/]+""",true),StaticPart("/"),DynamicPart("scheduleDate", """[^/]+""",true))))
        

// @LINE:30
private[this] lazy val controllers_Assets_at5 = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("assets/"),DynamicPart("file", """.+""",false))))
        
def documentation = List(("""GET""", prefix,"""controllers.Astra.index()"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """campuses""","""controllers.Astra.campuses()"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """buildings""","""controllers.Astra.buildings()"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """rooms""","""controllers.Astra.rooms()"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """schedule/campus/$campusId<[^/]+>/$scheduleDate<[^/]+>""","""controllers.Astra.scheduleByCampus(campusId:String, scheduleDate:String)"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """assets/$file<.+>""","""controllers.Assets.at(path:String = "/public", file:String)""")).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
  case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
  case l => s ++ l.asInstanceOf[List[(String,String,String)]] 
}}
      

def routes:PartialFunction[RequestHeader,Handler] = {

// @LINE:6
case controllers_Astra_index0(params) => {
   call { 
        invokeHandler(controllers.Astra.index(), HandlerDef(this, "controllers.Astra", "index", Nil,"GET", """ Default""", Routes.prefix + """"""))
   }
}
        

// @LINE:9
case controllers_Astra_campuses1(params) => {
   call { 
        invokeHandler(controllers.Astra.campuses(), HandlerDef(this, "controllers.Astra", "campuses", Nil,"GET", """ Campus""", Routes.prefix + """campuses"""))
   }
}
        

// @LINE:13
case controllers_Astra_buildings2(params) => {
   call { 
        invokeHandler(controllers.Astra.buildings(), HandlerDef(this, "controllers.Astra", "buildings", Nil,"GET", """ Building""", Routes.prefix + """buildings"""))
   }
}
        

// @LINE:17
case controllers_Astra_rooms3(params) => {
   call { 
        invokeHandler(controllers.Astra.rooms(), HandlerDef(this, "controllers.Astra", "rooms", Nil,"GET", """ Room""", Routes.prefix + """rooms"""))
   }
}
        

// @LINE:21
case controllers_Astra_scheduleByCampus4(params) => {
   call(params.fromPath[String]("campusId", None), params.fromPath[String]("scheduleDate", None)) { (campusId, scheduleDate) =>
        invokeHandler(controllers.Astra.scheduleByCampus(campusId, scheduleDate), HandlerDef(this, "controllers.Astra", "scheduleByCampus", Seq(classOf[String], classOf[String]),"GET", """ Schedule""", Routes.prefix + """schedule/campus/$campusId<[^/]+>/$scheduleDate<[^/]+>"""))
   }
}
        

// @LINE:30
case controllers_Assets_at5(params) => {
   call(Param[String]("path", Right("/public")), params.fromPath[String]("file", None)) { (path, file) =>
        invokeHandler(controllers.Assets.at(path, file), HandlerDef(this, "controllers.Assets", "at", Seq(classOf[String], classOf[String]),"GET", """ Map static resources from the /public folder to the /assets URL path""", Routes.prefix + """assets/$file<.+>"""))
   }
}
        
}

}
     