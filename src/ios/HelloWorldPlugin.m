#import "HelloWorldPlugin.h"

@implementation HelloWorldPlugin

- (void) say:(CDVInvokedUrlCommand*)command
{

    // get arguments from Javascript
    //id arg = [command.arguments objectAtIndex:0];
    BOOL arg = YES;
    
    CDVPluginResult* result;
 
    if (arg)
    {
        // Success Callback
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Hello World!"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
    else
    {
        // Error Callback
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }

}

@end

