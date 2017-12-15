import modals from '../utils/modals'
import utils from '../utils/utils'
import libraries from "../providers/libraries";

export default function make() {

  const modal = COSAlertWindow.new();

  const modalParams = {
    messageText: 'Configure your import',
    informativeText: 'Your icons will be arranged in artboards. Set size and padding of your artboards.',
    height: 230,
    width: 300
  }

  const lineHeight = 35

  const view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, modalParams.width, modalParams.height));

  modal.addAccessoryView(view);
  modal.setMessageText(modalParams.messageText);
  modal.setInformativeText(modalParams.informativeText);
  modal.addButtonWithTitle('Continue');
  modal.addButtonWithTitle('Cancel');

  const textBoxLabel = utils.createLabel('Artboard size', 0, modalParams.height - lineHeight, 150, 20)
  view.addSubview(textBoxLabel)
  const textBox = NSTextField.alloc().initWithFrame(NSMakeRect(150, modalParams.height - lineHeight, 50, 20));
  textBox.setStringValue('24');
  view.addSubview(textBox)
  const textBoxUnit = utils.createLabel('px', 205, modalParams.height - lineHeight, 50, 20)
  view.addSubview(textBoxUnit)

  const paddingBoxLabel = utils.createLabel('Artboard Padding', 0, modalParams.height - lineHeight * 2, 150, 20)
  view.addSubview(paddingBoxLabel)
  const paddingBox = NSTextField.alloc().initWithFrame(NSMakeRect(150, modalParams.height - lineHeight * 2, 50, 20));
  textBox.setStringValue('3');
  view.addSubview(paddingBox)
  const paddingBoxUnit = utils.createLabel('px', 205, modalParams.height - lineHeight * 2, 50, 20)
  view.addSubview(paddingBoxUnit)

  let groupDivider = utils.createDivider(NSMakeRect(0, modalParams.height - lineHeight * 3 + 20, modalParams.width, 1));
  view.addSubview(groupDivider);

  const symbolCheckBox = NSButton.alloc().initWithFrame(NSMakeRect(150, modalParams.height - lineHeight * 3, 200, 14));
  symbolCheckBox.setButtonType(NSSwitchButton);
  symbolCheckBox.setState(true);
  symbolCheckBox.setFont(NSFont.systemFontOfSize_(13));
  symbolCheckBox.setTitle('Convert to symbol')
  view.addSubview(symbolCheckBox);

  groupDivider = utils.createDivider(NSMakeRect(0, modalParams.height - lineHeight * 4 + 20, modalParams.width, 1));
  view.addSubview(groupDivider);

  const maskCheckBox = NSButton.alloc().initWithFrame(NSMakeRect(150, modalParams.height - lineHeight * 4, 200, 14));
  maskCheckBox.setButtonType(NSSwitchButton);
  maskCheckBox.setState(false);
  maskCheckBox.setFont(NSFont.systemFontOfSize_(13));
  maskCheckBox.setTitle('Add color mask')
  view.addSubview(maskCheckBox);

  const colorLibsLabel = utils.createLabel('Colors Library', 0, modalParams.height - lineHeight * 5, 150, 20)
  view.addSubview(colorLibsLabel)
  const colorLibsMenu = NSPopUpButton.alloc().initWithFrame(NSMakeRect(150, modalParams.height - lineHeight * 5, 130, 20));
  colorLibsMenu.setEnabled(false)

  const colorMenuLabel = utils.createLabel('Color', 0, modalParams.height - lineHeight * 6, 150, 20)
  view.addSubview(colorMenuLabel)
  const colorMenu = NSPopUpButton.alloc().initWithFrame(NSMakeRect(150, modalParams.height - lineHeight * 6, 130, 20));
  colorMenu.setEnabled(false)
  colorLibsMenu.menu = libraries.initLibsSelectList(libraries.getLibs(), colorMenu);

  view.addSubview(colorLibsMenu);
  view.addSubview(colorMenu);

  maskCheckBox.setCOSJSTargetFunction(function (mask) {
    if (mask.state()) {
      colorLibsMenu.setEnabled(true)
      if (colorMenu.selectedItem()) colorMenu.setEnabled(true)
    } else {
      colorLibsMenu.setEnabled(false)
      colorMenu.setEnabled(false)
    }
  });


  // const paddingBoxLabel = utils.createLabel('Artboard Padding', 0, modalParams.height - 60, 150, 20)
  // view.addSubview(paddingBoxLabel)
  // const paddingBox = NSTextField.alloc().initWithFrame(NSMakeRect(150, modalParams.height - 60, 50, 20));
  // textBox.setStringValue('3');
  // view.addSubview(paddingBox)
  // const paddingBoxUnit = utils.createLabel('px', 205, modalParams.height - 60, 50, 20)
  // view.addSubview(paddingBoxUnit)


  modal.runModal()
}

