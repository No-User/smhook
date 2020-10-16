/*var gettopaddr=Module.findExportByName(null,"lua_gettop")
console.log(gettopaddr)
var luastates=[]

Interceptor.attach(gettopaddr,{

  onEnter: function ( args) {
	  
	if(luastates.indexOf(args[0].toString()) <0){
		luastates.push(args[0].toString())
		console.log('lua_gettop('+args[0]+')');
		console.log(luastates)
	}
	
    
  },

  onLeave: function (retval) {
	 
  }
})*/


//C:\Python27\Scripts\frida.exe ScrapMechanic.exe -l smlua.js
var gettop = new NativeFunction(Module.getExportByName(null,"lua_gettop"),'int', ['pointer']);

var pcall = new NativeFunction(Module.getExportByName(null,"lua_pcall"),'int', ['pointer','int','int','int']);

var loadstring = new NativeFunction(Module.getExportByName(null,"luaL_loadstring"),'int', ['pointer','pointer']);

function luaexec(luastateindex,payload){
	var rets=[]
	rets[0]=loadstring(ptr(luastates[luastateindex]),Memory.allocUtf8String(payload))
	rets[1]=pcall(ptr(luastates[luastateindex]),0,0,0)
	return rets
}

var lua_newstate_addr=Module.findExportByName(null,"lua_newstate")
console.log("lua_newstate@")
console.log(lua_newstate_addr)
var luastates=[]
function enhanceluaenv(stateindex){ // export ffi to lua (sm.ffi)
luaexec(stateindex,'unsafe_env.sm.ffi = require("ffi")')
//preload some functions
luaexec(stateindex,"unsafe_env.sm.ffi.cdef[[int MessageBoxA(void *w, const char *txt, const char *cap, int type);]]")
//Example usage sm.ffi.C.MessageBoxA(nil, "Hello world!", "Test", 0)
luaexec(stateindex,"unsafe_env.sm.ffi.cdef[[unsigned short GetKeyState(int nVirtKey);]]")
//Example usage:
//if(sm.ffi.C.GetKeyState(79)==65409)then
//sm.gui.chatMessage("O key is pressed")
//end
}
Interceptor.attach(lua_newstate_addr,{

  onEnter: function ( args) {
	      
  },

  onLeave: function (retval) {
	 
		luastates.push(retval.toString())
		console.log('lua_newstate() = '+retval);
		enhanceluaenv(0) // hacky, but works
  }
})

