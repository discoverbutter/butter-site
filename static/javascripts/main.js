let featureList;
let currentFeature;
let tr = require("takeshape-routing");
let getImageUrl = tr.getImageUrl;
import css from "../stylesheets/main.scss";
import jQuery from "jQuery";
window.jquery = window.$ = jQuery;
import fullpage from "fullpage.js";
import "bootstrap";

$(document).ready(function() {
  let fullPageInstance = new fullpage("#fullpage", {
    //options here
    licenseKey: "6F1ED004-501241ED-968D38C4-BED591B1",
    anchors: ["hero", "roles", "features", "cities", "bottom"],
    sectionsColor: ["#fff", "#F1D5C7", "#925842", "#fff", "#fefaf9"],
    navigation: true,
    navigationPosition: "left",
    navigationTooltips: ["Top", "Roles", "Features", "Cities", "Bottom"],
    verticalCentered: true,
    autoScrolling: false,
    fitToSection: false
  });

  // let title = $("#page-title").text() + " | Butter";
  // let desc = $("#page-desc").text();
  // $(document).prop("title", title);
  // $(document).prop("title", title);
});

global.initialize = function() {
  let args = arguments;
  let s = args[0];
  if (s) {
    getFeatureList(s);
  }
};

// stores feature list as global variable and updates content on page via jquery
global.getFeatureList = function(s) {
  if (s) {
    // given string from nunjucks has characters that mess up JSON.parse,
    // this removes them
    s = s
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
    s = s.replace(/[\u0000-\u0019]+/g, "");
    let json = JSON.parse(s);
    featureList = json;
    const feature = featureList[0].feature;
    const imagePath = getImageUrl(feature.image.path);
    const imageAlt = feature.image.description;
    $("#featureBlurb").text(feature.blurb);
    $("#featureImage").attr("src", imagePath);
    $("#featureImage").attr("alt", imageAlt);
    currentFeature = 0;
    $("#feature-button" + currentFeature)
      .removeClass("butter-btn-transparent")
      .addClass("feature-btn-light");
  }
};

// switches between feature list content via jquery
global.changeFeature = function(num) {
  const feature = featureList[num].feature;
  const imagePath = getImageUrl(feature.image.path);
  const imageAlt = feature.image.description;
  $("#featureBlurb").text(feature.blurb);
  $("#featureImage").attr("src", imagePath);
  $("#featureImage").attr("alt", imageAlt);
  if (num != currentFeature) {
    $("#feature-button" + num)
      .removeClass("butter-btn-transparent")
      .addClass("feature-btn-light");
    $("#feature-button" + currentFeature)
      .removeClass("feature-btn-light")
      .addClass("butter-btn-transparent");
  }
  currentFeature = num;
};
