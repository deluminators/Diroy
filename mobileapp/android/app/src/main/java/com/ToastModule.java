package com.trackme;

import android.widget.Toast;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import android.content.IntentFilter;
import android.app.Activity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.Map;
import java.util.HashMap;
import java.util.Collection;

// public class NativeDevice{

//     private BluetoothDevice device;
//     private Map<String,Object> extra;

//     public NativeDevice(BluetoothDevice device) {
//         this.device = device;
//         this.extra = new HashMap<String,Object>();
//     }

//     public BluetoothDevice getDevice() {
//         return device;
//     }

//     public void addExtra(String name, Object value) {
//         extra.put(name, value);
//     }

//     public <T> T getExtra(String name) {
//         return (T) extra.get(name);
//     }

//     public WritableMap map() {
//         if (device == null)
//             return null;

//         WritableMap map = Arguments.createMap();

//         map.putString("name", device.getName());
//         map.putString("address", device.getAddress());
//         map.putString("id", device.getAddress());
//         map.putInt("class", (device.getBluetoothClass() != null)
//                 ? device.getBluetoothClass().getDeviceClass() : -1);

//         map.putMap("extra", Arguments.makeNativeMap(extra));

//         WritableMap map1 = Arguments.makeNativeMap(extra);

//         return map;
//     }
// }

public class ToastModule extends ReactContextBaseJavaModule implements ActivityEventListener {
  private static ReactApplicationContext reactContext;
  private ReactApplicationContext ReactContext;
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
  private BroadcastReceiver mBluetoothDiscoveryReceiver;
  private BluetoothAdapter mBluetoothAdapter;
  private Map<String, String> unpairedDevices;
  Promise promise = null;
  Promise discoverPromise = null;

  ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
    this.ReactContext = context;
    reactContext.addActivityEventListener(this);
  }

  @Override
  public String getName() {
    return "Toast";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    // Toast.makeText(getReactApplicationContext(), "override is correct",
    // Toast.LENGTH_SHORT).show();
    if (requestCode == 0) {
      if (resultCode == Activity.RESULT_OK) {
        if (promise != null) {
          promise.resolve(true);
        }
      } else {
        if (promise != null) {
          Toast.makeText(getReactApplicationContext(), "user denied", Toast.LENGTH_SHORT).show();
          promise.reject(new Exception("User did not enable Bluetooth"));
        }
      }
      promise = null;
    }
  }

  @Override
  public void onNewIntent(Intent intent) {
  }

  // private final BroadcastReceiver receiver = new BroadcastReceiver() {
  // public void onReceive(Context context, Intent intent) {
  // String action = intent.getAction();
  // Toast.makeText(getReactApplicationContext(), "find
  // device",Toast.LENGTH_SHORT).show();
  // if (BluetoothDevice.ACTION_FOUND.equals(action)) {
  // // Discovery has found a device. Get the BluetoothDevice
  // // object and its info from the Intent.
  // Toast.makeText(getReactApplicationContext(), "found
  // device",Toast.LENGTH_SHORT).show();
  // BluetoothDevice device =
  // intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
  // String deviceName = device.getName();
  // String deviceHardwareAddress = device.getAddress(); // MAC address
  // }else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
  // discoverPromise.resolve(unpairedDevices.values());
  // discoverPromise = null;
  // ReactContext.unregisterReceiver(mBluetoothDiscoveryReceiver);
  // }
  // }
  // };

  // @Override
  // public void onReceive(Context context, Intent intent){
  // String action = intent.getAction();
  // if(BluetoothDevice.ACTION_FOUND.equals(action)){
  // BluetoothDevice device =
  // intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
  // // NativeDevice nativeDevice = new NativeDevice(device);
  // // nativeDevice.addExtra("name",
  // intent.getStringExtra(BluetoothDevice.EXTRA_NAME));
  // // nativeDevice.addExtra("rssi",
  // intent.getShortExtra(BluetoothDevice.EXTRA_RSSI, Short.MIN_VALUE));
  // if (!unpairedDevices.containsKey(device.getAddress())) {
  // unpairedDevices.put(device.getAddress(), device);
  // } else {
  // // unpairedDevices.get(device.getAddress()).addExtra("rssi",
  // // intent.getShortExtra(BluetoothDevice.EXTRA_RSSI, Short.MIN_VALUE));
  // }
  // }else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
  // discoverPromise.resolve(unpairedDevices.values());
  // }
  // }

  // @Override
  // public void onDiscoveryComplete(Collection<NativeDevice> unpairedDevices) {
  // WritableArray deviceArray = Arguments.createArray();
  // for (NativeDevice device : unpairedDevices) {
  // deviceArray.pushMap(device.map());
  // }

  // discoverPromise.resolve(deviceArray);
  // discoverPromise = null;

  // try {
  // ReactContext.unregisterReceiver(mBluetoothDiscoveryReceiver);
  // mBluetoothDiscoveryReceiver = null;
  // } catch (Exception e) {
  // Log.e(this.getClass().getSimpleName(), "Unable to unregister receiver", e);
  // }
  // }

  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  @ReactMethod
  public void get(int val, Promise p) {
    p.resolve(2);
  }

  @ReactMethod
  public void discoverDevices(Promise p) {
    IntentFilter intentFilter = new IntentFilter();
    intentFilter.addAction(BluetoothDevice.ACTION_FOUND);
    intentFilter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
    discoverPromise = p;
    unpairedDevices = new HashMap<>();
    mBluetoothDiscoveryReceiver = new BroadcastReceiver() {
      public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        // Toast.makeText(getReactApplicationContext(), "find
        // device",Toast.LENGTH_SHORT).show();
        if (BluetoothDevice.ACTION_FOUND.equals(action)) {
          // Discovery has found a device. Get the BluetoothDevice
          // object and its info from the Intent.
          // Toast.makeText(getReactApplicationContext(), "found device",
          // Toast.LENGTH_SHORT).show();
          BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
          String deviceName = device.getName();
          String deviceHardwareAddress = device.getAddress(); // MAC address
          // BluetoothDevice device =
          // intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
          // NativeDevice nativeDevice = new NativeDevice(device);
          // nativeDevice.addExtra("name",
          // intent.getStringExtra(BluetoothDevice.EXTRA_NAME));
          // nativeDevice.addExtra("rssi",
          // intent.getShortExtra(BluetoothDevice.EXTRA_RSSI, Short.MIN_VALUE));
          if (!unpairedDevices.containsKey(device.getAddress())) {
            unpairedDevices.put(device.getAddress(), deviceName);
          } else {
            // unpairedDevices.get(device.getAddress()).addExtra("rssi",
            // intent.getShortExtra(BluetoothDevice.EXTRA_RSSI, Short.MIN_VALUE));
          }
        } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
          // Toast.makeText(getReactApplicationContext(), "resolve promise",
          // Toast.LENGTH_SHORT).show();
          WritableArray deviceArray = Arguments.createArray();
          for (Map.Entry<String, String> entry : unpairedDevices.entrySet()) {
            WritableMap map = Arguments.createMap();
            map.putString("name", entry.getValue());
            map.putString("address", entry.getKey());
            deviceArray.pushMap(map);
          }
          // for (String name : unpairedDevices) {
          // map.putString("name",device.EXTRA_NAME);
          // deviceArray.pushMap(map);
          // }
          discoverPromise.resolve(deviceArray);
          discoverPromise = null;
          ReactContext.unregisterReceiver(mBluetoothDiscoveryReceiver);
        }
      }
    };
    ReactContext.registerReceiver(mBluetoothDiscoveryReceiver, intentFilter);
    mBluetoothAdapter.startDiscovery();
  }

  @ReactMethod
  public void bluetoothCheck(Promise p) {
    BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    mBluetoothAdapter = bluetoothAdapter;
    if (bluetoothAdapter == null) {
      // Device doesn't support Bluetooth
      Toast.makeText(getReactApplicationContext(), "bluetooth no suported", Toast.LENGTH_SHORT).show();
    } else {
      // Toast.makeText(getReactApplicationContext(), "bluetooth
      // supported",Toast.LENGTH_SHORT).show();
      if (!bluetoothAdapter.isEnabled()) {
        Activity activity = getCurrentActivity();
        promise = p;
        Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
        activity.startActivityForResult(enableBtIntent, 0);
        Toast.makeText(getReactApplicationContext(), "bluetooth is turned on", Toast.LENGTH_SHORT).show();
      } else {
        Toast.makeText(getReactApplicationContext(), "bluetooth is on", Toast.LENGTH_SHORT).show();
        p.resolve(true);
      }
    }
  }

}