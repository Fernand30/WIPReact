package com.exampleapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.magus.fblogin.FacebookLoginPackage;
import ga.piroro.rnt.RNTPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new NavigationReactPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new RNGeocoderPackage(),
            new RNFetchBlobPackage(),
            new TwitterSigninPackage(),
            new FacebookLoginPackage(),
            new RNTPackage(),
            new RNFirebasePackage(),
          new RNGoogleSignInPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
