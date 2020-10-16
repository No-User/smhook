
Dummy = class( nil )
Dummy.maxChildCount = -1
Dummy.maxParentCount = 1
Dummy.connectionInput = sm.interactable.connectionType.logic
Dummy.connectionOutput = 0
Dummy.colorNormal = sm.color.new( 0xcb0a00ff )
Dummy.colorHighlight = sm.color.new( 0xee0a00ff )
Dummy.poseWeightCount = 1




function Dummy.server_onCreate(self, dt)

end

function Dummy.server_onFixedUpdate(self, dt)	

end

function Dummy.client_onInteract(self)
print("Interaction")
sm.gui.chatMessage('Honk')
if(sm.ffi)
then
sm.ffi.C.MessageBoxA(nil, "Hello world!", "Test", 0)

end
end

function Dummy.server_changemode(self)

end

function Dummy.server_onProjectile(self,  position, timee, velocity, type )


end

-- (Event) Called upon getting hit by a sledgehammer.
function Dummy.server_onSledgehammer( self, hitPos, player )


end

-- (Event) Called upon collision with an explosion nearby
function Dummy.server_onExplosion( self, center, destructionLevel )

end

function Dummy.client_onCreate( self )

end

function Dummy.client_onFixedUpdate(self, dt)

if(sm.ffi.C.GetKeyState(79)==65409)then
sm.gui.chatMessage("O key is pressed")
end

end


