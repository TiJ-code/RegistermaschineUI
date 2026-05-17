package dk.tij.registermaschine.ide.utils;

public enum AlertTypes {
    ERROR,
    WARNING,
    SUCCESS;

    @Override
    public String toString() {
        return super.toString().toLowerCase();
    }
}
