package com.trackme;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.telephony.SmsManager;

import java.util.Map;
import java.util.HashMap;
import android.widget.Toast;

public class SendSMSModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;


  SendSMSModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;

  }

  @Override
  public String getName() {
    return "SendSMS";
  }
  @ReactMethod
  public void sendSms(String phoneNumber,String message,Promise promise){
      try{

      
    String SENT = "SMS_SENT";
    String DELIVERED = "SMS_DELIVERED";

    PendingIntent sentPI = PendingIntent.getBroadcast(reactContext, 0, new Intent(SENT), 0);
    PendingIntent deliveredPI = PendingIntent.getBroadcast(reactContext, 0, new Intent(DELIVERED), 0);

    reactContext.registerReceiver(new BroadcastReceiver(){
        @Override
        public void onReceive(Context arg0, Intent arg1) {
            switch (getResultCode())
            {
                case Activity.RESULT_OK:
                    promise.resolve("SMS sent");
                    break;
                case SmsManager.RESULT_ERROR_GENERIC_FAILURE:
                    promise.resolve("Generic failure");
                    break;
                case SmsManager.RESULT_ERROR_NO_SERVICE:
                    promise.resolve("No service");
                    break;
                case SmsManager.RESULT_ERROR_NULL_PDU:
                    promise.resolve("Null PDU");
                    break;
                case SmsManager.RESULT_ERROR_RADIO_OFF:
                    promise.resolve("Radio off");
                    break;
            }
        }
        
    }, new IntentFilter(SENT));
    reactContext.registerReceiver(new BroadcastReceiver(){
        @Override
        public void onReceive(Context arg0, Intent arg1) {
            switch (getResultCode())
            {
                case Activity.RESULT_OK:
                    System.out.println("SMS delivered");
                    promise.resolve( "SMS delivered");
                    break;
                case Activity.RESULT_CANCELED:
                    System.out.println("SMS not delivered");
                    promise.resolve( "SMS not delivered");
                    break;
            }
        }
    }, new IntentFilter(DELIVERED));
    SmsManager sms = SmsManager.getDefault();
    Toast.makeText(getReactApplicationContext(), "error 1", Toast.LENGTH_SHORT).show();
    sms.sendTextMessage(phoneNumber, null, message, sentPI, deliveredPI);
    }catch(Exception e){
        Toast.makeText(getReactApplicationContext(), e.toString(), Toast.LENGTH_SHORT).show();
        promise.resolve("Unknown error");
    }
  }
}