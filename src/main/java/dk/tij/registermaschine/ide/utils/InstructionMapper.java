package dk.tij.registermaschine.ide.utils;

import dk.tij.registermaschine.api.compilation.compiling.OperandType;
import dk.tij.registermaschine.api.config.ConfigInstruction;
import dk.tij.registermaschine.api.instructions.IInstructionSet;

import java.util.List;

public final class InstructionMapper {
    public static List<InstructionDefinition> toDocList(IInstructionSet set) {
        return set.getInstructions().stream()
                .map(i -> {
                    StringBuilder nameBuilder = new StringBuilder(i.mnemonic().toUpperCase());
                    nameBuilder.append(' ');
                    for (var o : i.operands()) {
                        if (o.isImplicit()) continue;

                        switch (o.type()) {
                            case OperandType.IMMEDIATE -> nameBuilder.append("#?");
                            case OperandType.REGISTER ->  nameBuilder.append("R?");
                            case OperandType.LABEL ->     nameBuilder.append("label");
                        }

                        nameBuilder.append(' ');
                    }

                    return new InstructionDefinition(nameBuilder.toString(), i.description());
                })
                .toList();
    }

    public static List<String> toKeywords(IInstructionSet set) {
        return set.getInstructions().stream()
                .map(ConfigInstruction::mnemonic)
                .toList();
    }

    public record InstructionDefinition(String usage, String description) {}
}
