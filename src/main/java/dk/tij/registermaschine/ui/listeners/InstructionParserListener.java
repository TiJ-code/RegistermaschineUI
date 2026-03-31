package dk.tij.registermaschine.ui.listeners;

import dk.tij.registermaschine.api.config.ConfigInstruction;
import dk.tij.registermaschine.api.config.IConfigEventListener;
import dk.tij.registermaschine.api.config.ParsingEvent;
import dk.tij.registermaschine.ui.UiApplication;

public class InstructionParserListener implements IConfigEventListener {
    @Override
    public void onElementParsed(ParsingEvent<?> event) {
        if (!UiApplication.DEBUG_PARSING) return;

        if (event.result() instanceof ConfigInstruction instr) {
            System.out.println(instr.mnemonic());
        }
    }
}
