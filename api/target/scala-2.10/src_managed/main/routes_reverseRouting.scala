// @SOURCE:/var/www/cis264/api/conf/routes
// @HASH:d67b3a0950006b79e0a1d909323991803f411a3a
// @DATE:Sat Apr 26 19:27:43 CDT 2014

import Routes.{prefix => _prefix, defaultPrefix => _defaultPrefix}
import play.core._
import play.core.Router._
import play.core.j._

import play.api.mvc._
import play.libs.F

import Router.queryString


// @LINE:30
// @LINE:21
// @LINE:17
// @LINE:13
// @LINE:9
// @LINE:6
package controllers {

// @LINE:21
// @LINE:17
// @LINE:13
// @LINE:9
// @LINE:6
class ReverseAstra {
    

// @LINE:21
def scheduleByCampus(campusId:String, scheduleDate:String): Call = {
   Call("GET", _prefix + { _defaultPrefix } + "schedule/campus/" + implicitly[PathBindable[String]].unbind("campusId", dynamicString(campusId)) + "/" + implicitly[PathBindable[String]].unbind("scheduleDate", dynamicString(scheduleDate)))
}
                                                

// @LINE:9
def campuses(): Call = {
   Call("GET", _prefix + { _defaultPrefix } + "campuses")
}
                                                

// @LINE:17
def rooms(): Call = {
   Call("GET", _prefix + { _defaultPrefix } + "rooms")
}
                                                

// @LINE:13
def buildings(): Call = {
   Call("GET", _prefix + { _defaultPrefix } + "buildings")
}
                                                

// @LINE:6
def index(): Call = {
   Call("GET", _prefix)
}
                                                
    
}
                          

// @LINE:30
class ReverseAssets {
    

// @LINE:30
def at(file:String): Call = {
   Call("GET", _prefix + { _defaultPrefix } + "assets/" + implicitly[PathBindable[String]].unbind("file", file))
}
                                                
    
}
                          
}
                  


// @LINE:30
// @LINE:21
// @LINE:17
// @LINE:13
// @LINE:9
// @LINE:6
package controllers.javascript {

// @LINE:21
// @LINE:17
// @LINE:13
// @LINE:9
// @LINE:6
class ReverseAstra {
    

// @LINE:21
def scheduleByCampus : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Astra.scheduleByCampus",
   """
      function(campusId,scheduleDate) {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "schedule/campus/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("campusId", encodeURIComponent(campusId)) + "/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("scheduleDate", encodeURIComponent(scheduleDate))})
      }
   """
)
                        

// @LINE:9
def campuses : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Astra.campuses",
   """
      function() {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "campuses"})
      }
   """
)
                        

// @LINE:17
def rooms : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Astra.rooms",
   """
      function() {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "rooms"})
      }
   """
)
                        

// @LINE:13
def buildings : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Astra.buildings",
   """
      function() {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "buildings"})
      }
   """
)
                        

// @LINE:6
def index : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Astra.index",
   """
      function() {
      return _wA({method:"GET", url:"""" + _prefix + """"})
      }
   """
)
                        
    
}
              

// @LINE:30
class ReverseAssets {
    

// @LINE:30
def at : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Assets.at",
   """
      function(file) {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "assets/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("file", file)})
      }
   """
)
                        
    
}
              
}
        


// @LINE:30
// @LINE:21
// @LINE:17
// @LINE:13
// @LINE:9
// @LINE:6
package controllers.ref {


// @LINE:21
// @LINE:17
// @LINE:13
// @LINE:9
// @LINE:6
class ReverseAstra {
    

// @LINE:21
def scheduleByCampus(campusId:String, scheduleDate:String): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Astra.scheduleByCampus(campusId, scheduleDate), HandlerDef(this, "controllers.Astra", "scheduleByCampus", Seq(classOf[String], classOf[String]), "GET", """ Schedule""", _prefix + """schedule/campus/$campusId<[^/]+>/$scheduleDate<[^/]+>""")
)
                      

// @LINE:9
def campuses(): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Astra.campuses(), HandlerDef(this, "controllers.Astra", "campuses", Seq(), "GET", """ Campus""", _prefix + """campuses""")
)
                      

// @LINE:17
def rooms(): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Astra.rooms(), HandlerDef(this, "controllers.Astra", "rooms", Seq(), "GET", """ Room""", _prefix + """rooms""")
)
                      

// @LINE:13
def buildings(): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Astra.buildings(), HandlerDef(this, "controllers.Astra", "buildings", Seq(), "GET", """ Building""", _prefix + """buildings""")
)
                      

// @LINE:6
def index(): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Astra.index(), HandlerDef(this, "controllers.Astra", "index", Seq(), "GET", """ Default""", _prefix + """""")
)
                      
    
}
                          

// @LINE:30
class ReverseAssets {
    

// @LINE:30
def at(path:String, file:String): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Assets.at(path, file), HandlerDef(this, "controllers.Assets", "at", Seq(classOf[String], classOf[String]), "GET", """ Map static resources from the /public folder to the /assets URL path""", _prefix + """assets/$file<.+>""")
)
                      
    
}
                          
}
        
    