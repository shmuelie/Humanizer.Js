interface Date {
  humanize(dateToCompareAgainst: Date, culture: string): string
}
namespace Humanizer {
  Date.prototype.humanize = function(
    dateToCompareAgainst: Date = new Date(),
    culture: string = Resources.getCurrentCulture()
  ): string {
    return Configuration.Configurator.dateHumanizeStrategy.humanize(
      this,
      dateToCompareAgainst,
      culture
    )
  }
}
