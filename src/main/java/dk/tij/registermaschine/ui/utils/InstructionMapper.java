package dk.tij.registermaschine.ui.utils;

import dk.tij.registermaschine.api.config.ConfigInstruction;
import dk.tij.registermaschine.api.instructions.IInstructionSet;

import java.util.List;

public final class InstructionMapper {
    public static List<InstructionDefinition> toDocList(IInstructionSet set) {
        return set.getInstructions().stream()
                .map(i -> new InstructionDefinition(i.mnemonic(), i.description()))
                .toList();
    }

    public static List<String> toKeywords(IInstructionSet set) {
        return set.getInstructions().stream()
                .map(ConfigInstruction::mnemonic)
                .toList();
    }

    public record InstructionDefinition(String name, String description) {}
}
