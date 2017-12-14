import modals from '../utils/modals'
import utils from '../utils/utils'

export default {
  getImportIconsParams,
  getAddMaskOnSelectedArtboardsParams
}

/**
 * @name getImportIconsSelectedArtboardsParams
 * @description get params for the "getImportIconsParams" feature
 * @returns {Object}
 */
function getImportIconsParams(context) {

  const viewSize = {
    width: 300,
    height: 175
  }

  const modalParams = {
    messageText: 'Configure your import',
    informativeText:'Your icons will be arranged in artboards. Set size and padding of your artboards.'
  }

  const modal = modals.newModal(context, viewSize, modalParams)
  const checkboxFields = modals.createCheckBoxes()
  const maskFields = modals.createMaskFields(checkboxFields, context)
  const artboardFields = modals.createArtboardFields()

  const allFields = [artboardFields, checkboxFields, maskFields]
  modals.appendsFields(modal, allFields, true)
  modals.setNextKey(utils.flatten(allFields))

  const viewCell = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewSize.width, 25));
  viewCell.addSubview(utils.createLabel('Works only with color symbols.', 0, 0, 300, 20, 11))
  modal.view.addSubview(viewCell)

  return Object.assign(
    modals.getMainButtonParam(modals.runModal(modal)),
    modals.getParams(allFields)
  )
}

/**
 * @name getAddMaskOnSelectedArtboardsParams
 * @description get params for the "AddMaskOnSelectedArtboards" feature
 * @returns {Object}
 */
function getAddMaskOnSelectedArtboardsParams(context){
  const viewSize = {
    width: 300,
    height: 43
  }

  const modalParams = {
    informativeText: 'Select your library and choose a color to apply as mask. Your layers will all be combined.',
    messageText: 'Configure your color mask'
  }

  const modal = modals.newModal(context, viewSize, modalParams)
  const maskFields = modals.createMaskFields()
  const allFields = [maskFields]
  modals.appendsFields(modal, allFields)
  modals.setNextKey(utils.flatten(allFields))

  return Object.assign(modals.getMainButtonParam(modals.runModal(modal)), modals.getParams(allFields))
}