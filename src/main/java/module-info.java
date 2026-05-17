module dk.tij.registermaschine.ide {
    requires javafx.graphics;
    requires javafx.web;
    requires jdk.jsobject;
    requires dk.tij.jissuesystem;
    requires dk.tij.registermaschine.api;
    requires dk.tij.registermaschine.core;
    requires dk.tij.registermaschine.instructions;

    opens dk.tij.registermaschine.ide to javafx.graphics;
    opens dk.tij.registermaschine.ide.ui to javafx.graphics, javafx.web;
    opens dk.tij.registermaschine.ide.utils to javafx.web;
}